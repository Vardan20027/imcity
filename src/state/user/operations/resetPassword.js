import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPasswordEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const resetPassword = createAsyncThunk('user/resetPassword', async payload => {
  try {
    return await postUser(resetPasswordEndpoint.url, payload);
  } catch (err) {
    console.log(err.message, 'ERROR');
    throw err;
  }
});
