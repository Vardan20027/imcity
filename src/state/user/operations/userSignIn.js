import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const userSignIn = createAsyncThunk('user/userSignIn', async payload => {
  try {
    return await postUser(signInEndpoint.url, payload);
  } catch (err) {
    console.log(err.message, 'ERROR');
    throw err;
  }
});
