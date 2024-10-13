
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../../../Shared/Services/shopping-cart.service';
import { Products } from '../../../../../Shared/Interfaces/products';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductDetailsComponent } from '../../product-details/product-details.component';


interface CartItem {
  productId: number;
  productName: string;
  qty: number;
  price: number;
  imagesURL: string[];
}

@Component({
  selector: 'app-cart-nav',
  standalone: true,
  imports: [CartItemComponent, CommonModule, ProductDetailsComponent],
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.css'] 
})
export class CartNavComponent implements OnInit {

  
  cartItems: CartItem[] = [];

  cartTotal = 0;

  
  constructor(private msg: ShoppingCartService) { }

  ngOnInit() {
 
    this.msg.getMsg().subscribe((product: any) => {
      this.addProductToCart(product);
    });
  }

 
  addProductToCart(product: Products) {
    let productExists = false;

  
    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++;  
        productExists = true;
        break;
      }
    }

    
    if (!productExists) {
      this.cartItems.push({
        imagesURL: product.imagesURL,
        productId: product.id,
        productName: product.productName,
        qty: 1,
        price: product.productPrice
      });
    }

 
    this.calculateCartTotal();
  }

 
  calculateCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price);
    });
  }
}
