import { OrderTypeRadioInterface } from "@/interfaces/order-type-radio";

export const orderTypes: Array<OrderTypeRadioInterface> = [
  {
    name: 'Order',
    description: 'OnHand products ready for delivery'
  },
  {
    name: 'Pre Order',
    description: 'Wait for restock'
  }
]