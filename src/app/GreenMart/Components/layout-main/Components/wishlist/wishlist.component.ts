import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../../Shared/Services/wishlist.service';
import { Products } from '../../../../Shared/Interfaces/products';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from '../../../../Shared/Services/shopping-cart.service';
import { Cart } from '../../../../Shared/Interfaces/cart';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Products[] = [];
  cartItems: Cart[] = [];

  constructor(
    private wishlistService: WishlistService,
    private _cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe((wishlist) => {
      this.wishlist = wishlist;
    });
  }

  addToCart(product: Products, quantity: number): void {
    this._cartService.addToCart(product, quantity = 1).subscribe({
      next: (newItem) => {
        this.cartItems.push(newItem);
        this.showCustomAlert(`${product.productName} has been added to your cart!`);
      },
      error: (err) => {
        console.error(err);
      }
    });
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
  }
}
