import httpClient from '../../services/HttpClient';

const logged = (url, response) => {
  console.log(url, 'URLLLLL');
  console.log(response, 'response');
  return response.data;
};

export const postResource = async (url, payload, config) =>
  logged(url, await httpClient.post(url, payload, config));

export const putResource = async (url, payload) =>
  logged(url, await httpClient.put(url, payload));

export const deleteResource = async url => logged(url, await httpClient.delete(url));
