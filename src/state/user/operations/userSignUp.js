import { createAsyncThunk } from '@reduxjs/toolkit';
import { signUpEndpoint } from '../endpoints';
import { postUser } from './postUser';

export const userSignUp = createAsyncThunk('user/userSignUp', async (payload, { rejectWithValue }) => {
  try {
    return await postUser(signUpEndpoint.url, payload);
  } catch (err) {
    const data = err?.response?.data;
    return rejectWithValue({
      status: err?.response?.status,
      data,
      message: data?.message || err?.message,
    });
  }
});
