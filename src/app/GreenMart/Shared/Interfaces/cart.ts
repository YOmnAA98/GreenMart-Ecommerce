import { Products } from "./products";

export interface Cart {
  id?: number;
  product: Products;
  quantity: number;
}
