import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phoneInputData: {},
};

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState,
  reducers: {
    setPhoneInputData: (state = initialState, { payload }) => {
      state.phoneInputData = payload;
    },
    clearSheetReducer(state) {},
  },
});
export const { setPhoneInputData, clearSheetReducer } = sheetSlice.actions;
export default sheetSlice.reducer;
