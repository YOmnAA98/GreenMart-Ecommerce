import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../../../../Shared/Services/api-data.service';
import { RouterLink } from '@angular/router';
import { SlicingPipe } from '../../../../Shared/Pipes/slicing.pipe';
import { SearchPipe } from '../../../../Shared/Pipes/search.pipe';
import { Category } from '../../../../Shared/Interfaces/category';
import { Products } from '../../../../Shared/Interfaces/products';
import { TopRatedSectionComponent } from "../home/Components/top-rated-section/top-rated-section.component";
import { ShoppingCartService } from '../../../../Shared/Services/shopping-cart.service';
import { Cart } from '../../../../Shared/Interfaces/cart';
import { WishlistService } from '../../../../Shared/Services/wishlist.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SlicingPipe, SearchPipe, TopRatedSectionComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  categories: Category[] = [];
  products: Products[] = [];
  filteredProducts: Products[] = [];
  selectedProduct: any;
  activeTab: number = 0;
  searchText: string = '';
  cartItems: Cart[] = [];
  productDetails: any;
  inStockModal: any;

  constructor(
    private _apiDataService: ApiDataService,
    private _cartService: ShoppingCartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      }
    });

    this._apiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
        this.activeTab = this.categories[0].id;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.setActiveTab(this.activeTab);
  }

  setActiveTab(tabId: number): void {
    this.activeTab = tabId;

    this._apiDataService.getProductsByCategoryId(tabId).subscribe({
      next: (response) => {
        this.filteredProducts = response;
      }
    });
  }

  quickView(productId: any): void {
    this.selectedProduct = this.products.find((product: any) => product.id === productId);
  }

  addToCart(product: Products, productId: any): void {
    this._cartService.addToCart(product, 1).subscribe({
      next: (response) => {
        console.log('Product added to cart', response);
      },
      error: (err) => {
        console.error('Error adding to cart', err);
      }
    });
  }


  // handleAddToCart() {
  // }

  ModalView(productId: any): void {
    this.selectedProduct = this.products.find((product: any) => product.id === productId);
    if (this.selectedProduct.productQuantity === 0) {
      this.inStockModal = false;
    } else {
      this.inStockModal = true;
    }
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
