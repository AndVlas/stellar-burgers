import {
  feedReducer,
  getFeedsList,
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  errorSelector,
  isLoadingSelector
} from '../slices/feedSlice';
import { TOrder } from '@utils-types';

jest.mock('../../utils/burger-api');

const ordersMock: TOrder[] = [
  {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'done',
    number: 1,
    name: '111',
    createdAt: '2021-08-01T14:48:00.000Z',
    updatedAt: '2021-08-01T14:50:00.000Z'
  }
];

describe('проверка feedSlice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: ''
    };
  });

  test('проверка initialState', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('проверка getFeedsList.pending', () => {
    const action = { type: getFeedsList.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  test('проверка getFeedsList.fulfilled', () => {
    const payload = {
      orders: ordersMock,
      total: 100,
      totalToday: 10
    };

    const action = { type: getFeedsList.fulfilled.type, payload };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
  });

  test('проверка getFeedsList.rejected', () => {
    const action = {
      type: getFeedsList.rejected.type,
      error: { message: 'Error fetching feeds' }
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error fetching feeds');
  });

  test('проверка выбора orders', () => {
    const state = { feeds: initialState };
    expect(ordersSelector(state)).toEqual(initialState.orders);
  });

  test('проверка выбора total', () => {
    const state = { feeds: initialState };
    expect(totalSelector(state)).toEqual(initialState.total);
  });

  test('проверка выбора totalToday', () => {
    const state = { feeds: initialState };
    expect(totalTodaySelector(state)).toEqual(initialState.totalToday);
  });

  test('проверка выбора error', () => {
    const state = { feeds: initialState };
    expect(errorSelector(state)).toEqual(initialState.error);
  });

  test('проверка выбора loading', () => {
    const state = { feeds: initialState };
    expect(isLoadingSelector(state)).toEqual(initialState.loading);
  });
});
