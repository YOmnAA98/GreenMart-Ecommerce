
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiDataService } from '../../../../Shared/Services/api-data.service';
import { Products } from '../../../../Shared/Interfaces/products';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SlicingPipe } from '../../../../Shared/Pipes/slicing.pipe';
import { ShoppingCartService } from '../../../../Shared/Services/shopping-cart.service';
import { WishlistService } from '../../../../Shared/Services/wishlist.service';
import { Cart } from '../../../../Shared/Interfaces/cart';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxImageZoomModule, SlicingPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  products: Products[] = [];
  productDetails: any = {};
  relatedProducts: Products[] = [];
  selectedProduct: any;
  cartItems: Cart[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _apiDataService: ApiDataService,
    private shoppingCartService: ShoppingCartService,
    private wishlistService: WishlistService,
    private _cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        let productId: any = param.get('id');
        this._apiDataService.getProductById(productId).subscribe({
          next: (response) => {
            this.productDetails = response;
          }
        });
      }
    });
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.relatedProducts = response.filter((product: any) => {
          return product.category.name === this.productDetails.category.name;
        });
      }
    });
    this.shoppingCartService.cartItems$.subscribe((items: Cart[]) => {
      this.cartItems = items;
    });
    
  }

  quickView(productId: any): void {
    this.selectedProduct = this.relatedProducts.find((product: any) => product.id === productId);
  }

  addToWishlist(product: Products): void {
    if (product) {
      this.wishlistService.addToWishlist(product);
      this.showCustomAlert(`${product.productName} added to wishlist!`);
    } else {
      console.error('Product is undefined');
    }
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
      }, 4000);
    }
  }

  hideCustomAlert(): void {
    const alertBox = document.getElementById('custom-alert');
    if (alertBox) {
      alertBox.classList.remove('show');
      alertBox.classList.add('hidden');
    }
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

  ModalView(productId: any): void {
    this.selectedProduct = this.relatedProducts.find((product: any) => product.id === productId);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      if (item && item.product && item.product.productPrice) {
        return total + item.product.productPrice * item.quantity;
      }
      return total;
    }, 0);
  }

  isInCart(product: Products): boolean {
    return this.cartItems.some(item => item.product.id === product.id);
  }

  toggleWishlist(product: Products): void {
    if (this.wishlistService.isInWishlist(product)) {
      this.wishlistService.removeFromWishlist(product);
      this.showCustomAlert(`${product.productName} removed from wishlist!`);
    } else {
      this.wishlistService.addToWishlist(product);
      this.showCustomAlert(`${product.productName} added to wishlist!`);
    }
  }

  isInWishlist(product: Products): boolean {
    return this.wishlistService.isInWishlist(product);
  }
}
