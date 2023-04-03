import { useAppSelector } from '../../hooks';

export default function Cart() {
  const cart = useAppSelector((state) => state.cart);
  const cartItems = cart.value;
  // https://tailwindcomponents.com/component/tailwind-css-users-card-list
  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900">Cart</h3>
      </div>

      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {cartItems.map((cartItem) => (
            <li key={cartItem.cartItemId} className="py-3">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {cartItem.product.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    ₱{cartItem.product.price}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {cartItem.product.size}
                  </p>
                </div>
                <div className="flex-0 text-sm text-gray-900">
                  {cartItem.quantity}
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  ₱{cartItem.subTotal}
                </div>
              </div>
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