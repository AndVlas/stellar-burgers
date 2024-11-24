import { configureStore } from '@reduxjs/toolkit';
import {
  TOrderState,
  resetOrder,
  createOrderReducer,
  addOrder,
  initialState
} from '../slices/createOrderSlice';

const orderData: TOrderState = {
  orderRequest: true,
  orderModalData: {
    _id: '1',
    createdAt: '2025-10-30T18:30:18.058Z',
    status: 'done',
    name: 'бургер',
    updatedAt: '2025-10-30T18:32:20.058Z',
    number: 11111,
    ingredients: ['111', '222', '333']
  },
  error: undefined
};

const testStore = () =>
  configureStore({
    reducer: {
      addOrder: createOrderReducer
    }
  });

describe('проверка addOrderSlice', () => {
  test('проверка initialState', () => {
    const initialState = createOrderReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual(initialState);
  });

  describe('проверка reducers', () => {
    test('проверка resetOrder', () => {
      const store = testStore();
      store.dispatch(resetOrder());
      const state = store.getState();
      expect(state.addOrder).toEqual(initialState);
    });
  });

  describe('проверка selectors', () => {
    const store = testStore();
    test('проверка orderRequestSelector', () => {
      const state = store.getState().addOrder.orderRequest;
      expect(state).toBe(false);
    });
    test('проверка orderModalDataSelector', () => {
      const state = store.getState().addOrder.orderModalData;
      expect(state).toBe(null);
    });
    test('проверка errorSelector', () => {
      const state = testStore().getState();
      expect(state.addOrder.error).toEqual(orderData.error);
    });
  });

  describe('проверка extraReducers', () => {
    const store = testStore();
    test('pending', () => {
      store.dispatch({
        type: addOrder.pending.type
      });
      const state = store.getState();
      expect(state.addOrder.orderRequest).toBe(true);
    });
    test('fulfilled', () => {
      store.dispatch({
        type: addOrder.fulfilled.type,
        payload: {
          order: orderData.orderModalData
        }
      });
      const state = store.getState();
      expect(state.addOrder.orderRequest).toBe(false);
      expect(state.addOrder.orderModalData).toEqual(orderData.orderModalData);
    });
    test('rejected', () => {
      const errorMassage = 'error';
      store.dispatch({
        type: addOrder.rejected.type,
        error: { message: errorMassage }
      });
      const state = store.getState();
      expect(state.addOrder.error).toBe(errorMassage);
    });
  });
});
