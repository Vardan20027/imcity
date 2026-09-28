import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  screenLoader: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: state => {
      state.visible = true;
    },
    hideLoader: state => {
      state.visible = false;
    },
    showScreenLoader: state => {
      state.screenLoader = true;
    },
    hideScreenLoader: state => {
      state.screenLoader = false;
    },
  },
});

export const { showScreenLoader, hideScreenLoader, showLoader, hideLoader } =
  loaderSlice.actions;
export default loaderSlice.reducer;
