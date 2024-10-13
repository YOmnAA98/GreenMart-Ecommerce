import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../../Shared/Services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../../../Shared/Interfaces/cart';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  count: number = 1;
  constructor(private _cartService: ShoppingCartService) { }
  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this._cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateCartItem(cartItemId: number, newQuantity: number): void {
    this._cartService.updateCartItem(cartItemId, newQuantity).subscribe({
      next: (updatedItem) => {
        const index = this.cartItems.findIndex(item => item.id === cartItemId);
        if (index !== -1) {
          this.cartItems[index].quantity = updatedItem.quantity;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateCartQuantity(itemId: number, newQuantity: number): void {
    if (newQuantity < 1) {
      return;
    }
    const cartItem = this.cartItems.find(item => item.id === itemId);

    if (cartItem) {
      cartItem.quantity = newQuantity;
      this._cartService.updateCartItem(cartItem.id!,  this.count).subscribe({
        next: (response) => {
          console.log('Cart updated successfully');
        },
        error: (err) => {
          console.error('Failed to update cart item', err);
        }
      });
    } else {
      console.error('Cart item not found');
    }
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

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      if (item && item.product && item.product.productPrice) {
        return total + item.product.productPrice * item.quantity;
      }
      return total;
    }, 0);
  }
}
