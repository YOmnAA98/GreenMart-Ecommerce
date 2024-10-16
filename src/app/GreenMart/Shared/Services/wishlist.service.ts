


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../Interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Products[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlistSubject.next(JSON.parse(savedWishlist));
    }
  }

  addToWishlist(product: Products): void {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = [...currentWishlist, product];
    this.wishlistSubject.next(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  }

  removeFromWishlist(product: Products): void {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = currentWishlist.filter(item => item.id !== product.id);
    this.wishlistSubject.next(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  }

  isInWishlist(product: Products): boolean {
    return this.wishlistSubject.value.some(item => item.id === product.id);
  }
}

