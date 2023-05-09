import { OrderTypeRadioInterface } from "@/interfaces/order-type-radio";

export const orderTypes: Array<OrderTypeRadioInterface> = [
  {
    name: 'Order',
    description: 'Onhand and ready for delivery'
  },
  {
    name: 'Pre-order',
    description: 'Wait for restock (2 - 3 weeks)'
  }
]