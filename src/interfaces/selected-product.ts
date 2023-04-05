import { SizeTypes } from '../enums/size';
export type SelectedProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: SizeTypes;
}