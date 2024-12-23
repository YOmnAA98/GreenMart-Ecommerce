export interface Orders {
  id?: number;
  cartItems: CartItem[];
  totalAmount: number;
  date: Date;
  shippingInfo: any
  paymentStatus: string;  
}

export interface CartItem {
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
}
