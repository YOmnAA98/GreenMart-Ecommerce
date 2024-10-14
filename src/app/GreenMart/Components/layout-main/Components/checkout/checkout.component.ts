import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShoppingCartService } from '../../../../Shared/Services/shopping-cart.service';
import { Cart } from '../../../../Shared/Interfaces/cart';
import { Products } from '../../../../Shared/Interfaces/products';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  ErrorMessage: string = '';
  isLoading: boolean = false;
  cartItems: Cart[] = [];
  constructor(private _formBuilder: FormBuilder, private _cartService: ShoppingCartService) {
    this.checkoutForm = this._formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      postcode: [null, [Validators.required]],
      agreement: [null, [Validators.required]]
    })
  }
  ngOnInit(): void {
    this._cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateCartQuantity(itemId: number, product: Products, newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeFromCart(itemId);
    }
    const cartItem = this.cartItems.find(item => item.id === itemId);

    if (cartItem) {
      cartItem.quantity = newQuantity;
      this._cartService.updateCartItem(cartItem.id!, product, newQuantity).subscribe({
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
