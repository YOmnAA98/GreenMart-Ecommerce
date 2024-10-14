import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../Interfaces/cart';
import { Products } from '../Interfaces/products';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  subject = new Subject ()
  static productQuantity: any;

  constructor(private _httpClient: HttpClient) { }

  getCartItems(): Observable<Cart[]>{
    return this._httpClient.get<Cart[]>(`http://localhost:3000/cart`);
  }

  addToCart(product: Products, quantity: number): Observable<Cart>{
    const cartItem: Cart = {product, quantity};
    return this._httpClient.post<Cart>('http://localhost:3000/cart', cartItem);
  }

  removeFromCart(id: number): Observable<void>{
    return this._httpClient.delete<void>(`http://localhost:3000/cart/${id}`);
  }

  updateCartItem(id: number, product: Products, quantity: number): Observable<Cart>{
    const cartItem: Cart = {product, quantity};
    return this._httpClient.put<Cart>(`http://localhost:3000/cart/${id}`, cartItem);
  }

  updateCartQuantity(id: number, quantity: number): Observable<Cart>{
    return this._httpClient.put<Cart>(`http://localhost:3000/cart/${id}`, {quantity});
  }

  clearCart(): Observable<void>{
    return this._httpClient.delete<void>('http://localhost:3000/cart');
  }

  sendMsg(Products: Products){
    this.subject.next(Products)
  }
  getMsg(){
    return this.subject.asObservable()
  }

  updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.getCartItems));
  }
  
}
