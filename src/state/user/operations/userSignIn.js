import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInEndpoint } from '../endpoints';
import httpClient from '../../../services/HttpClient';

export const userSignIn = createAsyncThunk(
  'user/userSignIn',
  async (payload, { getState }) => {
    try {
      const { url } = signInEndpoint;
      console.log(url, "URLLLLL");
      const response = await httpClient.post(url, payload);

      console.log(response, 'response');
      // return data;
    } catch (err) {
      console.log(err.message, 'ERROR');
    }
  },
);
