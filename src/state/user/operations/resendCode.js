import { createAsyncThunk } from '@reduxjs/toolkit';
import { resendCodeEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const resendCode = createAsyncThunk('user/resendCode', async payload => {
  try {
    return await postUser(resendCodeEndpoint.url, payload);
  } catch (err) {
    console.log(err.message, 'ERROR');
    throw err;
  }
});
