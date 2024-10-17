
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../../../Shared/Services/shopping-cart.service';
import { Products } from '../../../../../Shared/Interfaces/products';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../../../Shared/Interfaces/cart';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-cart-nav',
  standalone: true,
  imports: [CartItemComponent, CommonModule, ProductDetailsComponent, RouterLink],
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.css'] 
})
export class CartNavComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(
    private _cartService: ShoppingCartService,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this._cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response;
        this.cdr.detectChanges();  // Trigger change detection after updating cart items
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateCartQuantity(itemId: number, product: Products, newQuantity: number): void {
    if (newQuantity < 1) {
      return;
    }
    const cartItem = this.cartItems.find(item => item.id === itemId);

    if (cartItem) {
      cartItem.quantity = newQuantity;
      this._cartService.updateCartItem(cartItem.id!, product, newQuantity).subscribe({
        next: (response) => {
          console.log('Cart updated successfully');
          this.loadCartItems();  // Refresh cart items after update
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
        this.cdr.detectChanges();  // Trigger change detection after removing cart item
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
