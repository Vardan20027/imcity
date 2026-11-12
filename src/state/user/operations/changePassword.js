import { createAsyncThunk } from '@reduxjs/toolkit';
import { changePasswordEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const changePassword = createAsyncThunk('user/changePassword', async payload => {
  try {
    return await postUser(changePasswordEndpoint.url, payload);
  } catch (err) {
    console.log(err.message, 'ERROR');
    throw err;
  }
});
