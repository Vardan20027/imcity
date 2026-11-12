import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfileEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const updateUserProfile = createAsyncThunk('user/updateProfile', async payload => {
  try {
    return await postUser(updateProfileEndpoint.url, payload);
  } catch (err) {
    console.log(err.message, 'ERROR');
    throw err;
  }
});
