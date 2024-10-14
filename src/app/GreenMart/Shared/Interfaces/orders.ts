export interface Orders {
  id?: number;
  cartItems: CartItem[];
  totalAmount: number;
  date: Date;
  shippingAddress: string;
  paymentStatus: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
}
