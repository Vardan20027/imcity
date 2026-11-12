import { createAsyncThunk } from '@reduxjs/toolkit';
import { verifyCodeEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const verifyCode = createAsyncThunk('user/verifyCode', async payload => {
  try {
    return await postUser(verifyCodeEndpoint.url, payload);
  } catch (err) {
    console.log(err.message, 'ERROR');
    throw err;
  }
});
