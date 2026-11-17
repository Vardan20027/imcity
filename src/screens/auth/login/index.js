import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Button from '../../../components/button';
import { COLORS } from '../../../assets/rootStyles';
import MIcon from '../../../components/svgs';
import styles from './styles';
import OnboardingHeader from '../../../components/onboarding/header';
import AuthLayout from '../../../components/layout/AuthLayout';
import { useContainer } from './hook';
import { useT } from '../../../locales/useT';

const Divider = () => {
  const t = useT();
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerLabel}>{t('Կամ')}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const t = useT();
  const { handleLoginAction, handleSignUp } = useContainer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [canSignUp, setCanSignUp] = useState(false);
  const [askName, setAskName] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const firstNameRef = useRef(null);

  useEffect(() => {
    if (!askName) return undefined;
    const frame = requestAnimationFrame(() => firstNameRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [askName]);

  const onSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const result = await handleLoginAction({ email, password });
    setSubmitting(false);
    if (!result || result.ok) {
      setEmailError('');
      setPasswordError('');
      setCanSignUp(false);
      setAskName(false);
      return;
    }
    if (result.errors) {
      setEmailError(result.errors.email || '');
      setPasswordError(result.errors.password || '');
      setCanSignUp(false);
      return;
    }
    setCanSignUp(Boolean(result.notFound));
    if (!result.notFound) setAskName(false);
    if (result.notFound) {
      setEmailError('Այս էլ. հասցեն դեռ գրանցված չէ');
      setPasswordError('');
      return;
    }
    if (result.field === 'email') {
      setEmailError(result.message);
      setPasswordError('');
      return;
    }
    setPasswordError(result.message);
    setEmailError('');
  };

  const openSignUp = () => {
    setAskName(true);
    setEmailError('');
    setPassword('');
    setPasswordConfirm('');
    setPasswordError('');
    setPasswordConfirmError('');
  };

  const backToLogin = () => {
    setAskName(false);
    setFirstNameError('');
    setLastNameError('');
    setPasswordConfirmError('');
  };

  const onSignUp = async () => {
    if (submitting) return;
    setSubmitting(true);
    const result = await handleSignUp({
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
    });
    setSubmitting(false);
    if (!result || result.ok) return;
    if (result.errors) {
      setEmailError(result.errors.email || '');
      setPasswordError(result.errors.password || '');
      setPasswordConfirmError(result.errors.passwordConfirm || '');
      setFirstNameError(result.errors.firstName || '');
      setLastNameError(result.errors.lastName || '');
      return;
    }
    if (result.field === 'firstName' || result.field === 'lastName') {
      setFirstNameError(result.field === 'firstName' ? result.message : '');
      setLastNameError(result.field === 'lastName' ? result.message : '');
      setPasswordConfirmError('');
      return;
    }
    setFirstNameError('');
    setLastNameError('');
    if (result.field === 'passwordConfirm') {
      setPasswordConfirmError(result.message);
      setPasswordError('');
      setEmailError('');
      return;
    }
    setPasswordConfirmError('');
    if (result.field === 'password') {
      setPasswordError(result.message);
      setEmailError('');
      return;
    }
    setEmailError(result.message);
  };

  return (
    <AuthLayout showLogo={false}>
      <View>
        <OnboardingHeader
          currentStep={1}
          totalSteps={5}
          onBack={() => navigation.goBack()}
        />

        <Text style={styles.title}>{askName ? t('Գրանցվել') : t('Մուտք')}</Text>

        {askName ? (
          <>
            <View style={styles.fieldBlock}>
              {firstNameError ? <Text style={styles.errorText}>{t(firstNameError)}</Text> : null}
              <TextInput
                ref={firstNameRef}
                style={[styles.input, firstNameError && styles.inputInvalid]}
                placeholder={t('Անուն')}
                placeholderTextColor={COLORS.textSecondary}
                value={firstName}
                onChangeText={value => {
                  setFirstName(value);
                  if (firstNameError) setFirstNameError('');
                }}
              />
            </View>
            <View style={styles.fieldBlock}>
              {lastNameError ? <Text style={styles.errorText}>{t(lastNameError)}</Text> : null}
              <TextInput
                style={[styles.input, lastNameError && styles.inputInvalid]}
                placeholder={t('Ազգանուն')}
                placeholderTextColor={COLORS.textSecondary}
                value={lastName}
                onChangeText={value => {
                  setLastName(value);
                  if (lastNameError) setLastNameError('');
                }}
              />
            </View>
          </>
        ) : null}

        <View style={styles.fieldBlock}>
          {emailError ? <Text style={styles.errorText}>{t(emailError)}</Text> : null}
          <TextInput
            style={[styles.input, emailError && styles.inputInvalid]}
            placeholder={t('Էլ. հասցե')}
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            value={email}
            onChangeText={value => {
              setEmail(value);
              if (emailError) setEmailError('');
              if (canSignUp) setCanSignUp(false);
            }}
            returnKeyType="next"
          />
        </View>

        <View style={styles.fieldBlock}>
          {passwordError ? <Text style={styles.errorText}>{t(passwordError)}</Text> : null}
          <TextInput
            style={[styles.input, passwordError && styles.inputInvalid]}
            placeholder={t('Գաղտնաբառ')}
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={value => {
              setPassword(value);
              if (passwordError) setPasswordError('');
            }}
            returnKeyType={askName ? 'next' : 'done'}
            onSubmitEditing={askName ? undefined : onSubmit}
          />
        </View>

        {askName ? (
          <View style={styles.fieldBlock}>
            {passwordConfirmError ? (
              <Text style={styles.errorText}>{t(passwordConfirmError)}</Text>
            ) : null}
            <TextInput
              style={[styles.input, passwordConfirmError && styles.inputInvalid]}
              placeholder={t('Կրկնել գաղտնաբառը')}
              placeholderTextColor={COLORS.textSecondary}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={passwordConfirm}
              onChangeText={value => {
                setPasswordConfirm(value);
                if (passwordConfirmError) setPasswordConfirmError('');
              }}
              returnKeyType="done"
              onSubmitEditing={onSignUp}
            />
          </View>
        ) : null}
        <Button
          label="Շարունակել"
          onPress={askName ? onSignUp : onSubmit}
          disabled={submitting}
        />
        {askName ? null : (
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword', { email: email.trim() })}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotLabel}>{t('Մոռացե՞լ եք գաղտնաբառը')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <View style={styles.accountRow}>
          {askName ? (
            <>
              <Text style={styles.accountHint}>{t('Ունե՞ք արդեն հաշիվ։ ')}</Text>
              <TouchableOpacity onPress={backToLogin} disabled={submitting}>
                <Text style={styles.signUpLabel}>{t('Մուտք գործել')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.accountHint}>{t('Հաշիվ չունե՞ք։ ')}</Text>
              <TouchableOpacity onPress={openSignUp} disabled={submitting}>
                <Text style={styles.signUpLabel}>{t('Գրանցվել')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <Divider />
        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
          <MIcon name="googleIcon" />
          <Text style={styles.googleLabel}>{t('Մուտք գործել Google-ով')}</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default LoginScreen;
