// 'use client';

// import OrderForm from "@/features/order-form/OrderForm";
// import { Provider } from "react-redux";
// import store from '@/store';

// export default function OrderContainer() {
//   return (
//     <Provider store={store}>
//       <div className="flex flex-col sm:flex-row items-start justify-center sm:space-x-4 space-y-4 sm:space-y-0">
//         <OrderForm></OrderForm>
//       </div>
//     </Provider>
//   )
// }
import OrderForm from "@/components/OrderForm";

export default function OrderContainer() {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-center sm:space-x-4 space-y-4 sm:space-y-0">
      <OrderForm></OrderForm>
    </div>
  )
}