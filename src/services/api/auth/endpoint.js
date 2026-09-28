import endpoint from '../../../utils/endpoint';

const refreshTokenEndpoint = endpoint('post', 'auth/access-token');

export { refreshTokenEndpoint };
