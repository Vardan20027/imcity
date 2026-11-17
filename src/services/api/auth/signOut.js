import { clearAuthToken, clearProfile, clearRefreshToken } from './token';
import { setAuthenticated } from './session';

const ignore = promise => promise.catch(() => {});

const signOut = async () => {
  await Promise.all([
    ignore(clearAuthToken()),
    ignore(clearRefreshToken()),
    ignore(clearProfile()),
  ]);
  setAuthenticated(false);
};

export { signOut };
