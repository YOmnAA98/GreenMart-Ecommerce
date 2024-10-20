import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../../../../../Shared/Services/api-data.service';
import { Products } from '../../../../../../Shared/Interfaces/products';
import { RouterLink } from '@angular/router';
import { SlicingPipe } from '../../../../../../Shared/Pipes/slicing.pipe';
import { ShoppingCartService } from '../../../../../../Shared/Services/shopping-cart.service';
import { Cart } from '../../../../../../Shared/Interfaces/cart';
import { WishlistService } from '../../../../../../Shared/Services/wishlist.service';

@Component({
  selector: 'app-top-rated-section',
  standalone: true,
  imports: [CommonModule, RouterLink, SlicingPipe],
  templateUrl: './top-rated-section.component.html',
  styleUrl: './top-rated-section.component.css'
})
export class TopRatedSectionComponent implements OnInit {
  products: Products[] = [];
  topRatedProducts: Products[] = [];
  selectedProduct: any;
  cartItems: Cart[] = [];

  constructor(
    private _apiDataService: ApiDataService,
    private _cartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.topRatedProducts = this.products.filter((product) => {
          return product.ratingsAverage > 4.5;
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.shoppingCartService.cartItems$.subscribe((items: Cart[]) => {
      this.cartItems = items;
    });
  }

  quickView(productId: any): void {
    this.selectedProduct = this.topRatedProducts.find((product: any) => product.id === productId);
  }

  addToCart(product: Products, quantity: number): void {
    this._cartService.addToCart(product, quantity = 1).subscribe({
      next: (newItem) => {
        this.cartItems.push(newItem);
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
  ModalView(productId: any): void {
    this.selectedProduct = this.products.find((product: any) => product.id === productId);
  }
  isInCart(product: Products): boolean {
    return this.cartItems.some(item => item.product.id === product.id);
  }

  toggleWishlist(product: Products): void {
    if (this.wishlistService.isInWishlist(product)) {
      this.wishlistService.removeFromWishlist(product);
    } else {
      this.wishlistService.addToWishlist(product);
    }
  }

  isInWishlist(product: Products): boolean {
    return this.wishlistService.isInWishlist(product);
  }
}
