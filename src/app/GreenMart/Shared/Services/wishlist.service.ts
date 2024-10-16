
// import { Injectable } from '@angular/core';
// import { Products } from '../Interfaces/products'; 

// @Injectable({
//   providedIn: 'root'
// })
// export class WishlistService {
//   private wishlist: Products[] = [];

//   constructor() {
//     this.loadWishlist(); 
//   }

  
//   loadWishlist() {
//     const storedWishlist = localStorage.getItem('wishlist');
//     if (storedWishlist) {
//       this.wishlist = JSON.parse(storedWishlist);
//     }
//   }

  
//   addToWishlist(product: Products) {
//     const exists = this.wishlist.find(item => item.id === product.id);
//     if (!exists) {
//       this.wishlist.push(product);
//       localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
//     }
//   }

  
//   removeFromWishlist(product: Products) {
//     this.wishlist = this.wishlist.filter(item => item.id !== product.id);
//     localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
//   }

  
//   getWishlist() {
//     return this.wishlist;
//   }
// }



// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Products } from '../Interfaces/products'; 

// @Injectable({
//   providedIn: 'root'
// })
// export class WishlistService {
//   private wishlist: Products[] = [];
//   private wishlistSubject = new BehaviorSubject<Products[]>(this.wishlist);
//   wishlist$ = this.wishlistSubject.asObservable(); // Observable لتمكين الاشتراك في التحديثات

//   constructor() {
//     this.loadWishlist(); 
//   }

//   private loadWishlist() {
//     const storedWishlist = localStorage.getItem('wishlist');
//     if (storedWishlist) {
//       this.wishlist = JSON.parse(storedWishlist);
//       this.wishlistSubject.next(this.wishlist); // Emit the current wishlist
//     }
//   }

//   addToWishlist(product: Products) {
//     const exists = this.wishlist.find(item => item.id === product.id);
//     if (!exists) {
//       this.wishlist.push(product);
//       localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
//       this.wishlistSubject.next(this.wishlist); // Emit the updated wishlist
//     }
//   }

//   removeFromWishlist(product: Products) {
//     this.wishlist = this.wishlist.filter(item => item.id !== product.id);
//     localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
//     this.wishlistSubject.next(this.wishlist); // Emit the updated wishlist
//   }

//   getWishlist() {
//     return this.wishlist;
//   }
// }













import { Injectable } from '@angular/core';
import { Products } from '../Interfaces/products';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlist: Products[] = [];
  wishlist$ = new BehaviorSubject<Products[]>(this.wishlist);

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
      this.wishlist$.next(this.wishlist); // تحديث BehaviorSubject
    }
  }

  addToWishlist(product: Products) {
    const exists = this.wishlist.find((item) => item.id === product.id);
    if (!exists) {
      this.wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      this.wishlist$.next(this.wishlist); // تحديث BehaviorSubject
    }
  }

  removeFromWishlist(product: Products) {
    this.wishlist = this.wishlist.filter((item) => item.id !== product.id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.wishlist$.next(this.wishlist); // تحديث BehaviorSubject
  }

  isProductInWishlist(product: Products): boolean {
    return this.wishlist.some((item) => item.id === product.id);
  }
}



