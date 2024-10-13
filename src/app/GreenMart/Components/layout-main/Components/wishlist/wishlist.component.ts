
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../../../wishlist.service';
import { Products } from '../../../../Shared/Interfaces/products'; 

@Component({
  selector: 'app-wishlist',
  standalone: true,
 imports: [ CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: Products[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlist = this.wishlistService.getWishlist();
  }

  addToCart(item: Products) {
    alert(`Added ${item.productName} to cart!`);
    
  }

  removeFromWishlist(item: Products) {
    this.wishlistService.removeFromWishlist(item);
    this.loadWishlist(); 
  }
}






