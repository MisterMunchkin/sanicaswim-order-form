import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import  cartSlice from './features/planned/cart/cartSlice';

export function makeStore() {
  return configureStore({
    reducer: { cart: cartSlice }
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store