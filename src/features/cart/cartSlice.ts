//https://github.com/vercel/next.js/blob/canary/examples/with-redux/src/features/counter/counterSlice.ts

import { SelectedProduct } from '@/interfaces/selected-product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartInterface, CartItemInterface } from './Cart.class';

const initialState: CartInterface = {
  value: [],
  getTotal: (cartItems: Array<CartItemInterface>): number => {
    let total = 0;
    cartItems.forEach(cartItem => {
      total += cartItem.getSubTotal(cartItem.product.price, cartItem.quantity);
    });
    return total;
  }
}

const createNewCartItem = (product: SelectedProduct): CartItemInterface => {
  return {
    cartItemId: product.id + product.size ?? '',
    product: product,
    quantity: 1,
    getSubTotal: (price: number, quantity: number): number => {
      return price * quantity;
    } 
  } as CartItemInterface;
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