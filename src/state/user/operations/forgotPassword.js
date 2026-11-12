import { createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const forgotPassword = createAsyncThunk('user/forgotPassword', async payload => {
  try {
    return await postUser(forgotPasswordEndpoint.url, payload);
  } catch (err) {
    console.log(err.message, 'ERROR');
    throw err;
  }
});
