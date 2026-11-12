import { useNavigation } from '@react-navigation/native';
import dispatch from '../../../utils/dispatch/dispatch';
import { verifyCode } from '../../../state/user/operations/verifyCode';
import { resendCode } from '../../../state/user/operations/resendCode';

function useContainer() {
  const navigation = useNavigation();

  const handleVerifyAction = async ({ token, code }) => {
    try {
      console.log(token, code);
      const response = await dispatch(verifyCode({ code, token })).unwrap();
      console.log('Success payload:', response);

      navigation.navigate('ChooseCity');
    } catch (error) {
      console.error('Failed to verify code:', error);
    }
  };

  const handleResendAction = async ({ token }) => {
    try {
      console.log(token);
      const response = await dispatch(resendCode({ token })).unwrap();
      console.log('Success payload:', response);
      return true;
    } catch (error) {
      console.error('Failed to resend code:', error);
      return false;
    }
  };

  return { handleVerifyAction, handleResendAction };
}

export { useContainer };
