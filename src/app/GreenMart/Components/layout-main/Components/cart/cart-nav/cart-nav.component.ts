
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../../../Shared/Services/shopping-cart.service';
import { Products } from '../../../../../Shared/Interfaces/products';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../../../Shared/Interfaces/cart';


@Component({
  selector: 'app-cart-nav',
  standalone: true,
  imports: [CommonModule, ProductDetailsComponent, RouterLink],
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.css'] 
})
export class CartNavComponent implements OnInit {
  cartItems: Cart[] = [];

  
  constructor(private _cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.loadCartItems();

  
  this._cartService.getMsg().subscribe((product: Products) => {
    console.log('Product added to cart:', product);
    this.loadCartItems(); 
  });
  this._cartService.cartItems$.subscribe((items: Cart[]) => {
    this.cartItems = items;
  });

}

loadCartItems(): void {
  this._cartService.getCartItems().subscribe({
    next: (response) => {
      this.cartItems = response;
    },
    error: (err) => {
      console.error('Error loading cart items', err);
    }
  });

    this._cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response;
      },
      error: (err) => {
        console.error('Error loading cart items', err);
      }
    });
  }

  
  updateCartQuantity(itemId: number, product: Products, newQuantity: number): void {
    if (newQuantity < 1) return;

    const cartItem = this.cartItems.find(item => item.id === itemId);
    if (!cartItem) {
      console.error('Cart item not found');
      return;
    }

    this._cartService.updateCartItem(itemId, product, newQuantity).subscribe({
      next: () => {
        console.log('Cart updated successfully');
        cartItem.quantity = newQuantity;
      },
      error: (err) => {
        console.error('Failed to update cart item', err);
      }
    });
  }

  
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product?.productPrice ?? 0) * item.quantity;
    }, 0);
  }
  removeFromCart(cartItemId: number): void {
    this._cartService.removeFromCart(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}