//https://github.com/vercel/next.js/blob/canary/examples/with-redux/src/features/counter/counterSlice.ts

import { SelectedProduct } from '@/interfaces/selected-product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItemState {
  cartItemId: string
  product: SelectedProduct;
  quantity: number;
  subTotal: number;
}

export interface CartState {
  value: Array<CartItemState>;
}

const initialState: CartState = {
  value: []
}

const createNewCartItem = (product: SelectedProduct): CartItemState => {
  return {
    cartItemId: product.id + product.size ?? '',
    product: product,
    quantity: 1,
    subTotal: product.price
  } as CartItemState;
}

const getSubtotal = (price: number, quantity: number): number => {
  return price * quantity;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<SelectedProduct>) => {
      //Should get a SelectedProduct and move it to the cart
      const addedToCart = action.payload;
      const cartIndex = state.value.findIndex(cartItem => cartItem.product.id === addedToCart.id && cartItem.product.size === addedToCart.size);
      //then needs to create new item
      if (cartIndex < 0) {
        const newCartItem = createNewCartItem(addedToCart);
        state.value.push(newCartItem);
      } else {
        //else update quantity and subTotal of existing cart item
        const cartItemState = state.value[cartIndex];

        cartItemState.quantity += 1;
        cartItemState.subTotal = getSubtotal(cartItemState.quantity, cartItemState.product.price);
      }
    },
    addQuantity: (state, action: PayloadAction<SelectedProduct>) => {
    },
    removeQuantity: (state, action: PayloadAction<SelectedProduct>) => {
    },
    remove: (state, action: PayloadAction<SelectedProduct>) => {
      const existingIndex = state.value.findIndex(cartItem => cartItem.product.id === action.payload.id);

      if (existingIndex >= 0) {
        state.value.splice(existingIndex, 1);
      }
    },
    reset: (state) => {
      state.value = [];
    }
  }
});

export const { add, remove, reset} = cartSlice.actions;

export default cartSlice.reducer;