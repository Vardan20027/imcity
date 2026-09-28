import endpoint from '../../utils/endpoint';


export const signUpEndpoint = endpoint('post', '/users/sign-up');
export const signInEndpoint = endpoint('post', '/users/sign-in');
export const verifyCodeEndpoint = endpoint('post', '/users/verify-email');
