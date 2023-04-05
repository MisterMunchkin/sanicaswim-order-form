//https://github.com/vercel/next.js/blob/canary/examples/with-redux/src/features/counter/counterSlice.ts

import { SelectedProduct } from '@/interfaces/selected-product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartInterface, CartItemInterface } from './Cart.class';

const initialState: CartInterface = {
  value: [],
  total: 0
}

const createNewCartItem = (product: SelectedProduct): CartItemInterface => {
  return {
    cartItemId: product.id + product.size ?? '',
    product: product,
    quantity: 1,
    subTotal: product.price
  } as CartItemInterface;
}

const updateSubTotal = (cartItem: CartItemInterface) => {
  cartItem.subTotal = getSubTotal(cartItem.product.price, cartItem.quantity)
}

const getSubTotal = (price: number, quantity: number): number => {
  return price * quantity;
}

const getTotal = (cartItems: Array<CartItemInterface>): number => {
  let total = 0;
  cartItems.forEach(cartItem => {
    total += getSubTotal(cartItem.product.price, cartItem.quantity);
  });
  return total;
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
        updateSubTotal(cartItemState);
      }

      state.total = getTotal(state.value);
    },
    setQuantity: (state, action: PayloadAction<{cartItemId: string, updatedQuantity: number}>) => {
      const cartIndex = state.value.findIndex(cartItem => cartItem.cartItemId === action.payload.cartItemId);
      if (cartIndex < 0) {
        return;
      }

      const cartItemState = state.value[cartIndex];
      cartItemState.quantity = action.payload.updatedQuantity;

      updateSubTotal(cartItemState);
      state.total = getTotal(state.value);
    },
    remove: (state, action: PayloadAction<CartItemInterface>) => {
      const existingIndex = state.value.findIndex(cartItem => cartItem.cartItemId === action.payload.cartItemId);

      if (existingIndex >= 0) {
        state.value.splice(existingIndex, 1);
      }
      state.total = getTotal(state.value);
    },
    reset: (state) => {
      state.value = [];
      state.total = getTotal(state.value);
    }
  }
});

export const { add, remove, reset, setQuantity } = cartSlice.actions;

export default cartSlice.reducer;