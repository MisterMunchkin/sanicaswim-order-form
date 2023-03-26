import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import productListReducer from './features/product-list/productListSlice';

export function makeStore() {
  return configureStore({
    reducer: { productList: productListReducer }
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