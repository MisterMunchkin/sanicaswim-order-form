import { useAppSelector } from '../../hooks';

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.value);

  return (
    <div className="overflow-x-auto p-3">
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            <th className="p-2">
              <div className="font-semibold text-left">Product Name</div>
            </th>
          </tr>
          <tr>
            <th className="p-2">
              <div className="font-semibold text-left">Size</div>
            </th>
          </tr>
          <tr>
            <th className="p-2">
              <div className="font-semibold text-left">Quantity</div>
            </th>
          </tr>
          <tr>
            <th className="p-2">
              <div className="font-semibold text-left">Sub Total</div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">

        </tbody>
      </table>
    </div>
  )
}