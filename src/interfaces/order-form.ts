import { AddressFormInterface } from "./address-form";
import { OrderTypeName } from "./order-type-radio";

export interface OrderFormInterface {
  instagramLink: string,
  fullName: string,
  phoneNumber: string,
  address: AddressFormInterface,
  order: string,
  orderType: OrderTypeName
  honeyPotEmail?: string
};
