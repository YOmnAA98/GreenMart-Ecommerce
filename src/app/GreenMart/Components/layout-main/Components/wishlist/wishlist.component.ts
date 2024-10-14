import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../../Shared/Services/wishlist.service';
import { Products } from '../../../../Shared/Interfaces/products'; 

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
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
    
    this.showCustomAlert(`${item.productName} has been added to your cart!`);
  }

  
  showCustomAlert(message: string): void {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');

    if (alertBox && alertMessage) {
      alertMessage.textContent = message;
      alertBox.classList.remove('hidden');
      alertBox.classList.add('show');

      
      setTimeout(() => {
        this.hideCustomAlert();
      }, 3000);
    }
  }

  
  hideCustomAlert(): void {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.classList.remove('show');
      alertBox.classList.add('hidden');
    }
  }

  removeFromWishlist(item: Products) {
    this.wishlistService.removeFromWishlist(item);
    this.loadWishlist(); 
  }
}
