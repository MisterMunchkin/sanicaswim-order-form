//https://github.com/vercel/next.js/blob/canary/examples/with-redux/src/features/counter/counterSlice.ts

import { Product } from '@/interfaces/product'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProductListState {
  value: Array<Product>;
}

const initialState: ProductListState = {
  value: []
}

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Array<Product>>) => {
      state.value = action.payload;
    },
    add: (state, action: PayloadAction<Product>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.value.findIndex(product => product.id === action.payload.id);

      if (existingIndex >= 0) {
        state.value.splice(existingIndex, 1);
      }
    },
    reset: (state) => {
      state.value = [];
    }
  }
});

export const {setList, add, remove, reset} = productListSlice.actions;

// export const selectProduct = (state: AppState) => state.
export default productListSlice.reducer;