import { configureStore } from '@reduxjs/toolkit';
import {
  userRegister,
  userUpdate,
  userGet,
  userLogout,
  userLogin,
  isAuthCheckedSelector,
  userDataSelector,
  errorSelector,
  nameDataSelector,
  userReducer,
  userState,
  initialState
} from '../slices/userSlice';
import store from '../store';

const userData: userState = {
  isAuthChecked: false,
  user: {
    email: '123@test.com',
    name: '123'
  },
  error: undefined
};

const testStore = configureStore({
  reducer: {
    user: userReducer
  }
});

describe('userSlice', () => {
  test('проверка initialState', () => {
    expect(testStore.getState().user).toEqual(initialState);
  });
});

describe('проверка selectors', () => {
  const state = testStore.getState();
  test('проверка isAuthCheckedSelector', () => {
    const isAuthChecked = isAuthCheckedSelector(state);
    expect(isAuthChecked).toEqual(false);
  });
  test('проверка userDataSelector', () => {
    const user = userDataSelector(state);
    expect(user).toBe(state.user.user);
  });
  test('проверка errorSelector', () => {
    const errorMessage = 'error';
    store.dispatch({
      type: userRegister.rejected.type,
      error: { massage: errorMessage }
    });
    const state = store.getState();
    const getError = errorSelector(state);
    expect(getError).toEqual(state.user.error);
  });
  test('проверка nameDataSelector', () => {
    store.dispatch({
      type: userGet.fulfilled.type,
      payload: { user: { name: 'test', email: userData.user.email } }
    });
    const state = store.getState();
    const name = nameDataSelector(state);
    expect(name).toBe(state.user.user.name);
  });
});

describe('extraReducers', () => {
  describe('проверка userRegister', () => {
    test('проверка userRegister.pending', () => {
      store.dispatch({
        type: userRegister.pending.type
      });
      const state = store.getState();
      expect(state.user?.error).toBe(``);
    });
    test('проверка userRegister.rejected', () => {
      store.dispatch({
        type: userRegister.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user?.error).toBe('error');
    });
    test('проверка userRegister.fulfilled', () => {
      store.dispatch({
        type: userRegister.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });
  });

  describe('проверка userUpdate', () => {
    test('проверка userUpdate.pending', () => {
      store.dispatch({
        type: userUpdate.pending.type
      });
      const state = store.getState();
      expect(state.user?.error).toBe(``);
    });
    test('проверка userUpdate.reject', () => {
      store.dispatch({
        type: userUpdate.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user?.error).toBe('error');
    });
    test('Тпроверка userUpdate.fulfilled', () => {
      store.dispatch({
        type: userUpdate.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });
  });

  describe('проверка userLogin', () => {
    test('проверка userLogin.pending', () => {
      store.dispatch({
        type: userLogin.pending.type
      });
      const state = store.getState();
      expect(state.user?.error).toBe(``);
      expect(state.user.isAuthChecked).toBe(false);
    });
    test('проверка userLogin.rejected', () => {
      store.dispatch({
        type: userLogin.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user?.error).toBe('error');
      expect(state.user.isAuthChecked).toBe(false);
    });
    test('проверка userLogin.fulfilled', () => {
      store.dispatch({
        type: userLogin.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData);
      expect(state.user.error).toBe('');
    });
  });

  describe('проверка userLogout', () => {
    test('проверка userLogout.fulfilled', () => {
      store.dispatch({
        type: userLogout.fulfilled.type
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(false);
      expect(state.user.user).toEqual({ email: '', name: '' });
    });
  });

  describe('проверка userGet', () => {
    test('проверка userGet.fulfilled', () => {
      store.dispatch({
        type: userGet.fulfilled.type,
        payload: userData
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(true);
      expect(state.user.user).toBe(userData.user);
      expect(state.user.error).toBe('');
    });
    test('проверка userGet.rejected', () => {
      store.dispatch({
        type: userGet.rejected.type,
        error: { message: 'error' }
      });
      const state = store.getState();
      expect(state.user.isAuthChecked).toBe(false);
      expect(state.user.error).toBe('error');
    });
  });
});
