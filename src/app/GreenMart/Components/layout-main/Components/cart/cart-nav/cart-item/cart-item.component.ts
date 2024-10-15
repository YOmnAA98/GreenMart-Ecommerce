import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartService } from '../../../../../../Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: any;
  @Output() quantityChanged = new EventEmitter<void>();
  price: any;
item: any;
  

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void { }
  incrementQuantity() {
    this.cartItem.qty += 1;
    this.updateCart();
  }
  decrementQuantity() {
    if (this.cartItem.qty > 1) {
      this.cartItem.qty -= 1;
    } else {
      this.removeItem();
    }
    this.updateCart();
  }
  removeItem() {
    this.shoppingCartService.removeFromCart(this.cartItem.id);
  }
  updateCart() {
    this.shoppingCartService.updateCart();
    this.quantityChanged.emit(); 
  }
}

