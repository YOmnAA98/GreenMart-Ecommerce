
import { Injectable } from '@angular/core';
import { Products } from '../Interfaces/products'; 

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Products[] = [];

  constructor() {
    this.loadWishlist(); 
  }

  
  loadWishlist() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  
  addToWishlist(product: Products) {
    const exists = this.wishlist.find(item => item.id === product.id);
    if (!exists) {
      this.wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }

  
  removeFromWishlist(product: Products) {
    this.wishlist = this.wishlist.filter(item => item.id !== product.id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  
  getWishlist() {
    return this.wishlist;
  }
}


