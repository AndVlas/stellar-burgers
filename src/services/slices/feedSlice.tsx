import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeedsList = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: ''
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday,
    isLoadingSelector: (state) => state.loading,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsList.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getFeedsList.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeedsList.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const {
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  isLoadingSelector,
  errorSelector
} = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
