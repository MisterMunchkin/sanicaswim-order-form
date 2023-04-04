import { TrashIcon } from '@heroicons/react/24/outline';
import { CartItemInterface } from './Cart.class';
import { useAppDispatch } from '../../hooks';
import { remove, setQuantity } from './cartSlice';
import QuantityPicker from '@/components/QuantityPicker';
import { useCallback } from 'react';

var cloneDeep = require('lodash.clonedeep');

interface CartItemProps {
  cartItem: CartItemInterface
}
export default function CartItem({cartItem}: CartItemProps) {
  const dispatch = useAppDispatch();

  function handleDeleteFromCart(cartItem: CartItemInterface): void {
    dispatch(remove(cloneDeep(cartItem)))
  }

  const handleUpdatedQuantity = useCallback(
    (updatedQuantity: number) => {
      if (updatedQuantity > 0) {  
        dispatch(setQuantity({
          cartItemId: cartItem.cartItemId,
          updatedQuantity: updatedQuantity
        }));
      } else {
        dispatch(remove(cloneDeep(cartItem)));
      }
    },
    [cartItem, dispatch]
  )

  return (
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
      <div className="flex-0">
        <QuantityPicker
          quantity={cartItem.quantity}
          handleUpdatedQuantity={handleUpdatedQuantity}
        />
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900">
        ₱{cartItem.subTotal}
      </div>
      <div className="inline-flex items-center">
        <TrashIcon
          className='w-6 h-6 cursor-pointer hover:text-red-500 ease-in-out duration-300'
          onClick={() => handleDeleteFromCart(cartItem)}
        >
        </TrashIcon>
      </div>
    </div>
  )
}