import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfileImageEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const updateUserProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async ({ uri, type, fileName }) => {
    try {
      const body = new FormData();
      body.append('image', {
        uri,
        type: type || 'image/jpeg',
        name: fileName || 'profile.jpg',
      });

      return await postUser(updateProfileImageEndpoint.url, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
        transformRequest: data => data,
      });
    } catch (err) {
      console.log(err.message, 'ERROR');
      throw err;
    }
  },
);
