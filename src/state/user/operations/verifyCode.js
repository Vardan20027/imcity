import { createAsyncThunk } from '@reduxjs/toolkit';
import { verifyCodeEndpoint } from '../endpoints';
import httpClient from '../../../services/HttpClient';

export const verifyCode = createAsyncThunk(
  'user/verifyCode',
  async ({ code, callback }, { getState }) => {
    try {
      const {
        user: { verification_token },
      } = getState();

      console.log('user/verifyCode------', verification_token);

      const { url } = verifyCodeEndpoint;

      const { data } = await httpClient.post(url, {
        code,
        token: verification_token,
      });

      if (callback) callback();

      console.log(data, 'DATA');
      return data;
    } catch (error) {
      console.error('verifyCode error:', error);
      throw error;
    }
  },
);
