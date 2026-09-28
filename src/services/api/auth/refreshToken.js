import { refreshTokenEndpoint, storeAuthToken } from '../../../services/api/auth';
import axios from 'axios';
import { baseUrl } from '../../../constants/url';

const refreshToken = async ({ token }) => {
  try {
    const { url } = refreshTokenEndpoint;
    console.log('refreshToken url', token);
    const {
      data: { data },
    } = await axios.post(
      url,
      { token: token },
      {
        baseURL: baseUrl,
        timeout: 20000,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    await storeAuthToken(data.accessToken);
    return data.accessToken;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // dispatch(userLogAuth({}));
    }

    // Handle token refresh failure (e.g., redirect to login)
    console.error('Failed to refresh token', error.response?.data);
    throw error;
  }
};

export { refreshToken };
