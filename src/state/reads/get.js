import httpClient from '../../services/HttpClient';

export const getResource = async (url, config) => {
  console.log(url, 'URLLLLL');
  const response = await httpClient.get(url, config);
  console.log(response, 'response');
  return response.data;
};
