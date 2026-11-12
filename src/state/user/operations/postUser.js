import httpClient from '../../../services/HttpClient';
import { storeAuthToken, storeRefreshToken } from '../../../services/api/auth';

export const postUser = async (url, payload, config) => {
  console.log(url, 'URLLLLL');
  const response = await httpClient.post(url, payload, config);
  console.log(response, 'response');
  const data = response.data;

  if (data && typeof data === 'object') {
    if (data.access_token) {
      await storeAuthToken(data.access_token);
    }
    if (data.refresh_token) {
      await storeRefreshToken(data.refresh_token);
    }
  }

  return data;
};
