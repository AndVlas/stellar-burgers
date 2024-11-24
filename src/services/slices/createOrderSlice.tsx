import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
};

export const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const addOrder = createAsyncThunk(
  'addOrder/createOrder',
  orderBurgerApi
);

export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    resetOrder: (state) => (state = initialState)
  },
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const { resetOrder } = createOrderSlice.actions;
export const { orderRequestSelector, orderModalDataSelector, errorSelector } =
  createOrderSlice.selectors;

export const createOrderReducer = createOrderSlice.reducer;
