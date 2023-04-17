export interface OrderFormInterface {
  instagramLink: string,
  fullName: string,
  phoneNumber: string,
  address: AddressInterface,
  order: string
};
  
export interface AddressInterface {
  addressLine1: string; //street address
  addressLine2?: string; //apt, suite, etc 
  city: string;
  province: string; //state, provice
  country: string;
  postCode: number;
}