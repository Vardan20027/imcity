import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const userSignIn = createAsyncThunk('user/userSignIn', async (payload, { rejectWithValue }) => {
  try {
    return await postUser(signInEndpoint.url, payload);
  } catch (err) {
    const data = err?.response?.data;
    return rejectWithValue({
      status: err?.response?.status,
      data,
      message: data?.message || err?.message,
    });
  }
});
