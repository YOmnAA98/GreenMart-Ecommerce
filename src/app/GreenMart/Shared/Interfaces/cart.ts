import { Products } from "./products";

export interface Cart {
  // price: any;
  // qty: any;
  // productId: number;
  id?: number;
  product: Products;
  quantity: number;
}
