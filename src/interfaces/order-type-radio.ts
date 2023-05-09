export interface OrderTypeRadioInterface {
  name: OrderTypeName,
  description: string
}

export type OrderTypeName = "Order" | "Pre-order";