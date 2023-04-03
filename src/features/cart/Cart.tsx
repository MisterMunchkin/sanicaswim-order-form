import { TrashIcon } from '@heroicons/react/24/outline';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { CartItemInterface } from './Cart.class';
import { remove } from './cartSlice';
import CartItem from './CartItem';

var cloneDeep = require('lodash.clonedeep');

export default function Cart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const cartItems = cart.value;
  // https://tailwindcomponents.com/component/tailwind-css-users-card-list

  const handleDeleteFromCart = (product: CartItemInterface) => {
    dispatch(remove(cloneDeep(product)));
  }

  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900">Cart</h3>
      </div>

      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {cartItems.map((cartItem) => (
            <li key={cartItem.cartItemId} className="py-3">
              <CartItem cartItem={cartItem}></CartItem>
            </li>
          ))}
        </ul>
        <div className="divide-y divide-gray-200">
          Total: {cart.getTotal(cart.value)}
        </div>
      </div>
    </div>
  )
}