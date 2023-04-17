export interface AddressFormInterface {
  addressLine1: string; //street address
  addressLine2?: string; //apt, suite, etc 
  city: string;
  province: string; //state, provice
  barangay: string;
  postCode: number;
}