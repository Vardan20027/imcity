import { useNavigation } from '@react-navigation/native';
import dispatch from '../../../utils/dispatch/dispatch';
import { userSignIn } from '../../../state/user/operations/userSignIn';
function useContainer() {
  const navigation = useNavigation(); // Hook hooks into context cleanly

  const handleLoginAction = async ({ email, password }) => {
    try {
      console.log(email, password);
      const response = await dispatch(userSignIn({ email, password })).unwrap();
      console.log('Success payload:', response);

      navigation.navigate('Verification', {
        token: response.verification_token,
      });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return { handleLoginAction };
}

export { useContainer };
