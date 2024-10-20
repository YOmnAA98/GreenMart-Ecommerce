import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiDataService } from '../../../../../../Shared/Services/api-data.service';
import { Products } from '../../../../../../Shared/Interfaces/products';
import { Category } from '../../../../../../Shared/Interfaces/category';
import { SlicingPipe } from '../../../../../../Shared/Pipes/slicing.pipe';
import { ShoppingCartService } from '../../../../../../Shared/Services/shopping-cart.service';
import { Cart } from '../../../../../../Shared/Interfaces/cart';
import { WishlistService } from '../../../../../../Shared/Services/wishlist.service';

@Component({
  selector: 'app-top-features-section',
  standalone: true,
  imports: [CommonModule, RouterLink, SlicingPipe],
  templateUrl: './top-features-section.component.html',
  styleUrl: './top-features-section.component.css'
})
export class TopFeaturesSectionComponent implements OnInit {  
  products: Products[] = [];
  categories: Category[] = [];
  filteredProducts: Products[] = [];
  selectedProduct: any;
  activeTab: number = 0;
  cartItems: Cart[] = [];
  searchText: string = '';
  productDetails: any;  

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
        this.filteredProducts = response;
      }
    });

    this._apiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
        if (this.categories.length > 0){
          this.activeTab = this.categories[0].id;
          this.setActiveTab(this.activeTab);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.shoppingCartService.cartItems$.subscribe((items: Cart[]) => {
      this.cartItems = items;
    });
  }

  setActiveTab(tabId: number): void {
    this.activeTab = tabId;

    this._apiDataService.getProductsByCategoryId(tabId).subscribe({
      next: (response) => {
        this.filteredProducts = response;
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

  quickView(productId: any): void {
    this.selectedProduct = this.filteredProducts.find((product: any) => product.id === productId);
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
}
