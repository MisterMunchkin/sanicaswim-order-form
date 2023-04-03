import { SelectedProduct } from "@/interfaces/selected-product";

export interface CartItemInterface {
  cartItemId: string
  product: SelectedProduct;
  quantity: number;
  subTotal: number;
}

export interface CartInterface {
  value: Array<CartItemInterface>;
  getTotal: (cartItems: Array<CartItemInterface>) => number;
}