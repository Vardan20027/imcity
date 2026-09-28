import { createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '../../../services/HttpClient';
import { signUpEndpoint } from '../endpoints';

export const userSignUp = createAsyncThunk(
  'user/userSignUp',
  async (payload, { getState }) => {
    try {
      const { url } = signUpEndpoint;
      const { data } = await httpClient.post(url, payload);
      return data;
    } catch (err) {
      console.log('error', err);
      //
    }
  },
);
