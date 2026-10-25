import dispatch from "../../../utils/dispatch/dispatch";
import { userSignIn} from "../../../state/user/operations/userSignIn";
import { navigate } from '../../../services/navigation'
import { ROUT_NAMES } from '../../../constants/rout'
import {userSignUp} from "../../../state/user/operations/userSignUp";

function useContainer() {
  const handleVerifyAction = ({ token, code }) => {
      console.log(token, code);
    dispatch(userSignIn({ token, code }));
    // navigate(ROUT_NAMES.VERIFICATION);
  };

  return { handleVerifyAction };
}

export { useContainer };
