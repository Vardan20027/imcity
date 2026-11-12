import { useNavigation } from '@react-navigation/native';
import dispatch from '../../../utils/dispatch/dispatch';
import { forgotPassword } from '../../../state/user/operations/forgotPassword';
import { resetPassword } from '../../../state/user/operations/resetPassword';

function useContainer() {
  const navigation = useNavigation();

  const handleForgotAction = async ({ email }) => {
    try {
      console.log(email);
      const response = await dispatch(forgotPassword({ email })).unwrap();
      console.log('Success payload:', response);

      navigation.navigate('ResetPassword', {
        email,
        token: response?.verification_token || response?.token,
      });
    } catch (error) {
      console.error('Failed to send reset code:', error);
    }
  };

  const handleResetAction = async ({ email, token, code, password, password_confirmation }) => {
    try {
      const payload = { email, code, password, password_confirmation };
      if (token) {
        payload.token = token;
      }
      console.log(payload);
      const response = await dispatch(resetPassword(payload)).unwrap();
      console.log('Success payload:', response);

      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  return { handleForgotAction, handleResetAction };
}

export { useContainer };
