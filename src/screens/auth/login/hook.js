import dispatch from "../../../utils/dispatch/dispatch";
import { userSignIn} from "../../../state/user/operations/userSignIn";
import { navigate } from '../../../services/navigation'
import { ROUT_NAMES } from '../../../constants/rout'

function useContainer() {
  const handleLoginAction = ({ email, password }) => {
      console.log(email, password);
    dispatch(userSignIn({ email, password }));
    // navigate(ROUT_NAMES.VERIFICATION);
  };

  return { handleLoginAction };
}

export { useContainer };
