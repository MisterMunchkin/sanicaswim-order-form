import { AddressFormInterface } from "./address-form";

export interface OrderFormInterface {
  instagramLink: string,
  fullName: string,
  phoneNumber: string,
  address: AddressFormInterface,
  order: string,
  orderType: 'Order' | 'Pre Order'
  honeyPotEmail?: string
};
