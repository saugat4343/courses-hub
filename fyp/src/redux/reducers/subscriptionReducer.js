import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    buySubscriptionRequest: state => {
      state.loading = true;
    },
    buySubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.subscriptionId = action.payload;
    },
    buySubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelSubscriptionRequest: state => {
      state.loading = true;
    },
    cancelSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    cancelSubscriptionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSubscriptionError: state => {
      state.error = null;
    },
    clearSubscriptionMessage: state => {
      state.message = null;
    },
  },
});

export const {
  buySubscriptionRequest,
  buySubscriptionSuccess,
  buySubscriptionFail,
  cancelSubscriptionRequest,
  cancelSubscriptionSuccess,
  cancelSubscriptionFail,
  clearSubscriptionError,
  clearSubscriptionMessage,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
