import { createSlice } from '@reduxjs/toolkit';
import { toastMessageTypes } from './types';

const initialState = {
  visible: false,
  message: '',
  duration: 0,
  type: toastMessageTypes.INFO,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    show_toast: (state = initialState, { payload }) => ({
      ...state,
      visible: true,
      message: payload.message,
      duration: payload.duration || 400,
      type: payload.type || state.type,
    }),
    hide_toast: state => ({
      ...state,
      visible: false,
      message: '',
      duration: 0,
      type: toastMessageTypes.INFO,
    }),
  },
});

export const { show_toast, hide_toast } = toastSlice.actions;
export default toastSlice.reducer;
