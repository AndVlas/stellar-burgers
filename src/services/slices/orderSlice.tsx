import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

export const ordersList = createAsyncThunk('orders/getOrders', getOrdersApi);

export type TOrdersState = {
  orders: Array<TOrder>;
  loading: boolean;
};

export const initialState: TOrdersState = {
  orders: [],
  loading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    ordersListSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(ordersList.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(ordersList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(ordersList.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { ordersListSelector } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
