import { useAppSelector } from '../../../hooks';
import CartItem from './CartItem';

//Make the UI more like shopee, it looks better for mobile
//Consider using a cart icon that brings you to a new view instead of having everything in one
//page. This new view will hold the cart list, and then the user can input order form stuff.

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const cartItems = cart.value;
  // https://tailwindcomponents.com/component/tailwind-css-users-card-list

  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {cartItems.map((cartItem) => (
            <li key={cartItem.cartItemId} className="py-3">
              <CartItem cartItem={cartItem}></CartItem>
            </li>
          ))}
        </ul>
        <div className="divide-y divide-gray-200">
          Total: {cart.total}
        </div>
      </div>
    </div>
  )
}