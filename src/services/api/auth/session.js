let authenticated = false;
const listeners = new Set();

const setAuthenticated = value => {
  authenticated = Boolean(value);
  listeners.forEach(listener => listener(authenticated));
};

const subscribeAuthenticated = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export { setAuthenticated, subscribeAuthenticated };
