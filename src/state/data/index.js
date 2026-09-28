import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationError: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    dataAPIRequest(state, action) {
      return {
        ...state,
        [action.payload.endpoint]: {
          loading: true,
          notificationError: null,
          params: action.payload.params,
        },
      };
    },
    dataAPISuccess(state, action) {
      return {
        ...state,
        [action.payload.endpoint]: {
          loading: false,
          response: action.payload.response,
        },
      };
    },
    dataAPIFailure(state, action) {
      return {
        ...state,
        [action.payload.endpoint]: {
          loading: false,
          error: action.payload.error || null,
        },
        notificationError: action.payload.error,
      };
    },
    clearDataReducer(state) {},
  },
});
export const {
  dataAPIRequest,
  dataAPISuccess,
  dataAPIFailure,
  clearDataReducer,
} = dataSlice.actions;
export default dataSlice.reducer;
