import endpoint from '../../utils/endpoint';


export const signUpEndpoint = endpoint('post', '/users/sign-up');
export const signInEndpoint = endpoint('post', '/users/sign-in');
export const verifyCodeEndpoint = endpoint('post', '/users/verify-email');
export const resendCodeEndpoint = endpoint('post', '/users/resend-email-code');
export const forgotPasswordEndpoint = endpoint('post', '/users/forgot-password');
export const resetPasswordEndpoint = endpoint('post', '/users/reset-password');
export const changePasswordEndpoint = endpoint('post', '/users/change-password');
export const updateProfileEndpoint = endpoint('post', '/users/update-profile');
export const updateProfileImageEndpoint = endpoint('post', '/users/update-profile-image');
