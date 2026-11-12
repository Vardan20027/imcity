import dispatch from '../../../utils/dispatch/dispatch';
import { changePassword } from '../../../state/user/operations/changePassword';
import { updateUserProfile } from '../../../state/user/operations/updateProfile';
import { updateUserProfileImage } from '../../../state/user/operations/updateProfileImage';

const run = async (action, payload) => {
  try {
    const response = await dispatch(action(payload)).unwrap();
    console.log('Success payload:', response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

function useContainer() {
  const handleChangePassword = payload => run(changePassword, payload);
  const handleUpdateProfile = payload => run(updateUserProfile, payload);
  const handleUpdateProfileImage = payload => run(updateUserProfileImage, payload);

  return { handleChangePassword, handleUpdateProfile, handleUpdateProfileImage };
}

export { useContainer };
