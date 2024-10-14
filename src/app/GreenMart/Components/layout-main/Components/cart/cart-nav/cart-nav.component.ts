
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../../../Shared/Services/shopping-cart.service';
import { Products } from '../../../../../Shared/Interfaces/products';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';
import { RouterLink } from '@angular/router';


interface CartItem {
  productId: number;
  productName: string;
  qty: number;
  price: number;
  imagesURL: string[];
  productQuantity: number;
}

@Component({
  selector: 'app-cart-nav',
  standalone: true,
  imports: [CartItemComponent, CommonModule, ProductDetailsComponent, RouterLink],
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.css'] 
})
export class CartNavComponent implements OnInit {

  
  cartItems: any[] = [];
  cartTotal: number = 0;
  qty: any;
ShoppingCartService: any;
  
  constructor(private msg: ShoppingCartService, ) { }

  ngOnInit():void {
 
    this.msg.getMsg().subscribe((product: any) => {
      this.addProductToCart(product);
    });
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItems = storedCartItems;
    this.calculateCartTotal();
    
  }
  

 
  addProductToCart(product: Products) {
    let productExists = false;
    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++;  
        productExists = true;
        break;}}
    if (!productExists) {
      this.cartItems.push({
        imagesURL: product.imagesURL,
        productId: product.id,
        productName: product.productName,
        qty: 1,
        price: product.productPrice
      });}
  
      this.updateCart();
    this.calculateCartTotal();
  }
  removeFromCart(productId: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateCartTotal();
  }
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.calculateCartTotal();
  }
 
  calculateCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price);
    });
    this.updateCart();
  }
 
}
