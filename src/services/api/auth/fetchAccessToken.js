import { refreshTokenEndpoint, storeAuthToken } from '../../../services/api/auth';
import HttpClient from '../../HttpClient';

const fetchAccessToken = async body => {
  const { url } = refreshTokenEndpoint;
  const {
    data: { data },
  } = await HttpClient.post(url, body);
  await storeAuthToken(data.accessToken);
};

export { fetchAccessToken };
