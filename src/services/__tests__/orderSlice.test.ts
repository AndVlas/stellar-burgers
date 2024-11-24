import { TOrder } from '@utils-types';
import { ordersSlice, TOrdersState, ordersList } from '../slices/orderSlice';

describe('проверка orderSlice', () => {
  const initialState: TOrdersState = {
    orders: [],
    loading: false
  };

  const responseOrders = [
    {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['', '']
    } as TOrder
  ];

  const orders = [
    {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['', '']
    } as TOrder,
    {
      _id: '2',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 2,
      ingredients: ['', '']
    } as TOrder
  ];

  it('проверка ordersList.pending', () => {
    const pendingResult: TOrdersState = {
      orders: [],
      loading: true
    };
    const state = ordersSlice.reducer(initialState, ordersList.pending(''));
    expect(state).toEqual(pendingResult);
  });

  it('проверка ordersList.rejected', () => {
    const rejectedResult: TOrdersState = {
      orders: [],
      loading: false
    };
    const state = ordersSlice.reducer(
      initialState,
      ordersList.rejected(new Error('Error message'), '')
    );
    expect(state).toEqual(rejectedResult);
  });

  it('проверка ordersList.fulfilled', () => {
    const fulfilledResult: TOrdersState = {
      orders: responseOrders,
      loading: false
    };
    const state = ordersSlice.reducer(
      initialState,
      ordersList.fulfilled(responseOrders, '')
    );
    expect(state).toEqual(fulfilledResult);
  });

  it('проверка ordersList', () => {
    const orderListResult: TOrdersState = {
      orders,
      loading: false
    };
    const state = ordersSlice.reducer(
      initialState,
      ordersList.fulfilled(orders, '')
    );
    expect(state).toEqual(orderListResult);
  });
});
