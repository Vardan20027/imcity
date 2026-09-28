import axios from "axios";
import DeviceInfo from 'react-native-device-info';
import i18n from 'i18next';
import {deviceInfo} from '../../assets/deviceInfo';
import {baseUrl} from '../../constants/url';
import { getAuthToken, refreshToken } from '../api/auth';
import dispatch from "../../utils/dispatch/dispatch";
import {
  dataAPIFailure,
  dataAPIRequest,
  dataAPISuccess,
} from '../../state/data';
import {isEmpty} from "lodash";
import {show_toast} from "../../state/snackbars";
import {toastMessageTypes} from "../../state/snackbars/types";


const requestConfig = {
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const HttpClient = axios.create(requestConfig);

const handleRequest = async config => {
  const token = await getAuthToken();
  console.log(token, 'token:handleRequest');
  const locale = i18n.language;
  console.log(locale)
  dispatch(
    dataAPIRequest({
      endpoint: `${config?.method} ${config?.url}`,
      params: config?.params,
    }),
  );
  if (config.headers) {
    config.headers['X-localization'] = locale;
    try {
      const res = await DeviceInfo.getUniqueId();
      if (deviceInfo.ios) {
        config.headers.guid_id = res;
      } else {
        config.headers.app_id = res;
      }
    } catch (deviceError) {
      console.error('Failed to get unique ID:', deviceError);
    }
    if (!isEmpty(token)) {

      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  console.log(config,"CONFIG")

  return config;
};

const handleResponse = response => {
  dispatch(
      dataAPISuccess({
        endpoint: `${response?.config?.method} ${response?.config?.url}`,
        response: response?.data?.message,
      }),
  );
  return response;
};

const handleError = async error => {
  console.log(error, "Error:444");
  dispatch(
      dataAPIFailure({
        endpoint: `${error?.config?.method} ${error?.config?.url}`,
      }),
  );
  dispatch(
    show_toast({
      message: 'Ops, something went wrong',
      type: toastMessageTypes.ERROR,
    }),
  );
  if (error.response && error.response.status === 500) {
    dispatch(
      show_toast({
        message: 'Ops, something went wrong',
        type: toastMessageTypes.ERROR,
      }),
    );
  }
  console.log(error.response.status, 'error.response.status');

  if (error.response && error.response.status === 401) {
    // dispatch(userLogAuth({}));
  }
  if (error.response && error.response?.status === 403) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken({
          token: error?.response?.data?.refreshToken,
        });
        HttpClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return HttpClient(originalRequest);
      } catch (tokenRefreshError) {
        // Handle error in refreshing token
        console.error('Token refresh error:', tokenRefreshError);
        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  }

  if (error.response && error.response.data && error.response.status !== 401) {
  }

  return Promise.reject(error);
};

HttpClient.interceptors.request.use(handleRequest);

HttpClient.interceptors.response.use(handleResponse, handleError);

export default HttpClient;