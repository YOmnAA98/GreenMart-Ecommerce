import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders, CartItem } from '../Interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _httpClient: HttpClient) { }

  getOrders(): Observable<Orders[]>{
    return this._httpClient.get<Orders[]>('http://localhost:3000/orders');
  }
  submitOrder(cartItems: CartItem[], totalAmount: number, shippingAddress: string): Observable<Orders>{
    const order: Orders = {
      cartItems,
      totalAmount,      
      date: new Date(),
      shippingAddress,
      paymentStatus: 'Pending',
    }
    return this._httpClient.post<Orders>('http://localhost:3000/orders', order);
  }
}
