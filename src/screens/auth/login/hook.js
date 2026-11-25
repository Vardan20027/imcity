import { useNavigation } from '@react-navigation/native';
import dispatch from '../../../utils/dispatch/dispatch';
import { userSignIn } from '../../../state/user/operations/userSignIn';
import { userSignUp } from '../../../state/user/operations/userSignUp';
import { clearAuthToken, clearRefreshToken, setAuthenticated } from '../../../services/api/auth';
import { mapCurrentUser } from '../../../state/reads/shape';
import { replaceProfile } from '../../app/profile/data';
import { setRegistration } from '../draft';
import {
  emailError,
  filledErrors,
  passwordConfirmError,
  passwordError,
  personNameError,
} from '../../../utils/validate';

const emailVerified = response => {
  const value =
    response?.email_verified ??
    response?.user?.email_verified ??
    response?.data?.email_verified ??
    response?.data?.user?.email_verified;
  return value === true;
};

const verificationToken = response => {
  if (!response) return undefined;
  if (typeof response === 'string') return response;
  return (
    response.verification_token ||
    response.token ||
    response.data?.verification_token ||
    response.data?.token
  );
};

const textOf = value => {
  if (!value) return '';
  if (Array.isArray(value)) return value.map(textOf).filter(Boolean).join(' ');
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return Object.values(value).map(textOf).filter(Boolean).join('\n');
  }
  return '';
};

const errorBody = error => error?.data || error?.response?.data || null;

const errorStatus = error => error?.status || error?.response?.status;

const errorText = error => {
  const body = errorBody(error);
  if (typeof body === 'string' && body) return body;
  if (body && typeof body === 'object') {
    return textOf(body.message) || textOf(body.errors?.email) || textOf(body.errors?.password);
  }
  const message = textOf(error?.message);
  if (/request failed with status code/i.test(message)) return '';
  return message;
};

const isEmailNotFound = error => {
  const status = errorStatus(error);
  const blob = errorText(error).toLowerCase();
  if (status === 404) return true;
  return /not found|does not exist|doesn't exist|cannot find|can't find|no account|no user|unknown user|unregistered|is not registered|isn't registered|չի գտնվել|գոյություն չունի/.test(
    blob,
  );
};

const mentionsEmail = text => /email|էլ\.?\s*հասցե|էլփոստ/.test(text);
const mentionsPassword = text => /password|գաղտնաբառ|credential/.test(text);

const isAmbiguousLogin = error => {
  const blob = errorText(error).toLowerCase();
  return mentionsEmail(blob) && mentionsPassword(blob);
};

const isEmailTaken = error =>
  /already|taken|exists|in use|օգտագործված|արդեն գրանց|արդեն օգտագործ/.test(errorText(error).toLowerCase());

const isWrongPassword = error => {
  if (isEmailNotFound(error) || isEmailTaken(error)) return false;
  const body = errorBody(error);
  const passwordMessage = textOf(body?.errors?.password).toLowerCase();
  if (passwordMessage && !mentionsEmail(passwordMessage)) return true;
  const blob = errorText(error).toLowerCase();
  return (
    isAmbiguousLogin(error) ||
    /incorrect password|wrong password|password is incorrect|գաղտնաբառը սխալ|կամ գաղտնաբառ/.test(blob)
  );
};

const clearSessionTokens = () =>
  Promise.all([clearAuthToken().catch(() => {}), clearRefreshToken().catch(() => {})]);

const openApp = (response, email) => {
  const patch = mapCurrentUser(response);
  replaceProfile({ ...patch, email: patch.email || email });
  setAuthenticated(true);
};

function useContainer() {
  const navigation = useNavigation();

  const registerUnknownEmail = async ({ email, password, passwordConfirm, firstName, lastName }) => {
    const errors = filledErrors({
      email: emailError(email),
      password: passwordError(password),
      passwordConfirm: passwordConfirmError(password, passwordConfirm),
      firstName: personNameError(firstName, 'first'),
      lastName: personNameError(lastName, 'last'),
    });
    if (errors) return { errors };
    const first_name = firstName.trim().replace(/\s+/g, ' ');
    const last_name = lastName.trim().replace(/\s+/g, ' ');
    setRegistration({
      email,
      password,
      name: `${first_name} ${last_name}`,
      city: null,
      emotions: [],
      username: '',
      birthday: '',
      gender: '',
    });
    const response = await dispatch(
      userSignUp({ email, password, first_name, last_name }),
    ).unwrap();
    if (emailVerified(response)) {
      openApp(response, email);
      return { ok: true };
    }
    await clearSessionTokens();
    navigation.navigate('Verification', { token: verificationToken(response) });
    return { ok: true };
  };

  const handleLoginAction = async ({ email, password }) => {
    const trimmedEmail = email.trim();
    const errors = filledErrors({
      email: emailError(trimmedEmail),
      password: passwordError(password),
    });
    if (errors) return { errors };

    try {
      const response = await dispatch(
        userSignIn({ email: trimmedEmail, password }),
      ).unwrap();
      if (emailVerified(response)) {
        openApp(response, trimmedEmail);
        return { ok: true };
      }
      setRegistration({ email: trimmedEmail, password });
      await clearSessionTokens();
      navigation.navigate('Verification', { token: verificationToken(response) });
      return { ok: true };
    } catch (error) {
      if (isEmailTaken(error)) {
        return { field: 'email', message: 'Էլ. հասցեն արդեն օգտագործված է' };
      }
      if (isEmailNotFound(error)) {
        return {
          notFound: true,
          field: 'email',
          message: 'Այս էլ. հասցեն դեռ գրանցված չէ',
        };
      }
      if (isWrongPassword(error)) {
        return { field: 'password', message: 'Սխալ էլ. հասցե կամ գաղտնաբառ' };
      }
      const message = errorText(error);
      const emailMessage = textOf(error?.response?.data?.errors?.email);
      if (emailMessage) {
        return { field: 'email', message: emailMessage };
      }
      return { field: 'password', message: message || 'Չհաջողվեց մուտք գործել' };
    }
  };

  const handleSignUp = ({ email, password, passwordConfirm, firstName, lastName }) =>
    registerUnknownEmail({
      email: email.trim(),
      password,
      passwordConfirm,
      firstName,
      lastName,
    }).catch(signUpError => {
      if (isEmailTaken(signUpError)) {
        return { field: 'email', message: 'Էլ. հասցեն արդեն օգտագործված է' };
      }
      return {
        field: 'email',
        message: errorText(signUpError) || 'Չհաջողվեց գրանցվել այս էլ. հասցեով',
      };
    });

  return { handleLoginAction, handleSignUp };
}

export { useContainer };
