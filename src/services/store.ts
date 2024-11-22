import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userReducer } from './slices/userSlice';
import { ingredientsSliceReducer } from './slices/ingredientsSlice';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { addOrderReducer } from './slices/addOrderSlice';
import { feedReducer } from './slices/feedSlice';
import { ordersReducer } from './slices/orderSlice';

const rootReducer = combineReducers({
  user: userReducer,
  burgerIngredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorReducer,
  addOrder: addOrderReducer,
  feed: feedReducer,
  orders: ordersReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
