//https://github.com/vercel/next.js/blob/canary/examples/with-redux/src/features/counter/counterSlice.ts

import { SelectedProduct } from '@/interfaces/selected-product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProductListState {
  value: Array<SelectedProduct>;
}

const initialState: ProductListState = {
  value: []
}

export const selectedProductListSlice = createSlice({
  name: 'selectedProductList',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Array<SelectedProduct>>) => {
      state.value = action.payload;
    },
    add: (state, action: PayloadAction<SelectedProduct>) => {
      state.value.push(action.payload);
      console.log(state.value);
    },
    remove: (state, action: PayloadAction<SelectedProduct>) => {
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

export const {setList, add, remove, reset} = selectedProductListSlice.actions;

// export const selectProduct = (state: AppState) => state.
export default selectedProductListSlice.reducer;