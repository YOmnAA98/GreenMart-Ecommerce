import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Orders, CartItem } from '../Interfaces/orders';
import { Cart } from '../Interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _httpClient: HttpClient) {}

  getOrders(): Observable<Orders[]> {
    return this._httpClient.get<Orders[]>('http://localhost:3000/orders');
  }
  submitOrder(cartItems: CartItem[], totalAmount: number, shippingInfo: any): Observable<Orders> {
    const order: Orders = {cartItems, totalAmount, date: new Date(), shippingInfo, paymentStatus: 'Processing',};
    return this._httpClient.post<Orders>('http://localhost:3000/orders', order);
  }

  clearCart(cartItems: Cart[]): Observable<void> {
    const deleteCart = cartItems.map((item) =>
      this._httpClient.delete<void>(`http://localhost:3000/cart/${item.id}`)
    );
    return forkJoin(deleteCart).pipe(map(() => {}));
  }

  getOrderById(id: number): Observable<Orders> {
    return this._httpClient.get<Orders>(`http://localhost:3000/orders/${id}`);
  }
}
