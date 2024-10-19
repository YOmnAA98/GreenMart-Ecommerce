import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from '../Interfaces/cart';
import { Products } from '../Interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private subject = new Subject<Products>();
  private cartItems = new BehaviorSubject<Cart[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private _httpClient: HttpClient) {}

  getCartItems(): Observable<Cart[]> {
    return this._httpClient.get<Cart[]>('http://localhost:3000/cart').pipe(
      tap((items: Cart[]) => this.cartItems.next(items)) 
    );
  }

  addToCart(product: Products, quantity: number): Observable<Cart> {
    const cartItem: Cart = { product, quantity };
    return this._httpClient.post<Cart>('http://localhost:3000/cart', cartItem).pipe(
      tap(() => {
        this.sendMsg(product); 
        this.notifyCartChange(); 
      })
    );
  }

  removeFromCart(id: number): Observable<void> {
    return this._httpClient.delete<void>(`http://localhost:3000/cart/${id}`).pipe(
      tap(() => {
        
        this.getCartItems().subscribe((items) => {
          this.cartItems.next(items); 
        });
      })
    );
  }
  

  updateCartItem(id: number, product: Products, quantity: number): Observable<Cart> {
    const cartItem: Cart = { product, quantity };
    return this._httpClient.put<Cart>(`http://localhost:3000/cart/${id}`, cartItem).pipe(
      tap(() => this.notifyCartChange()) 
    );
  }

  clearCart(): Observable<void> {
    return this._httpClient.delete<void>('http://localhost:3000/cart').pipe(
      tap(() => {
        this.cartItems.next([]);
        this.notifyCartChange(); 
      })
    );
  }

  sendMsg(product: Products) {
    this.subject.next(product);
  }

  getMsg(): Observable<Products> {
    return this.subject.asObservable();
  }


  notifyCartChange() {
    
    this.cartItems.next(this.cartItems.value);
  }


  // updateCart() {
  //   localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
  // }
}
