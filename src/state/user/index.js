import { createSlice } from '@reduxjs/toolkit';
import { userSignUp } from './operations/userSignUp';
import { userSignIn } from './operations/userSignIn';
import { verifyCode } from './operations/verifyCode';

const initialState = {
  currentUser: '',
  currentLocation: null,
  speakers: [],
  token: '',
  refresh_token: '',
  verification_token: '',
  loader: false,
  users: [],
  selectedAccount: null,
  phoneInputData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.verification_token = action?.payload;
    });
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.verification_token = action?.payload.verification_token;
      state.token = action?.payload.access_token;
      state.refresh_token = action?.payload.refresh_token;
      state.currentUser = action?.payload.user;
    });
    builder.addCase(verifyCode.fulfilled, (state, action) => {
      state.token = action?.payload.access_token;
      state.refresh_token = action?.payload.refresh_token;
      state.currentUser = action?.payload.user;
    });
  },
  reducers: {
    logout: state => ({
      ...state,
      currentUser: '',
      token: '',
      refresh_token: '',
    }),

    setAuthToken: (state, { payload: { token } }) => {
      state.token = token;
    },
    setSelectedAccount: (state, { payload }) => {
      state.selectedAccount = payload;
    },
    updateCurrentLocation: (state, { payload }) => {
      state.currentLocation = payload;
    },

    clean_verification_token: state => ({
      ...state,
      verification_token: '',
    }),
  },
});

export const {
  logout,
  setAuthToken,
  setSelectedAccount,
  clean_verification_token,
  updateCurrentLocation,
} = userSlice.actions;
export default userSlice.reducer;
