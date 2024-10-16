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
  categories: Category[] = [];
  filteredProducts: Products[] = [];
  wishlist: any[] = []; // قائمة الرغبات
  selectedProduct: any;
  activeTab: number = 0;
  cartItems: Cart[] = [];
  
  constructor(private _apiDataService: ApiDataService, private _cartService: ShoppingCartService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.filteredProducts = response;
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

    // استرجاع قائمة الرغبات من localStorage عند التحميل
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlist = JSON.parse(savedWishlist);
    }
  }

  setActiveTab(tabId: number): void {
    this.activeTab = tabId;

    this._apiDataService.getProductsByCategoryId(tabId).subscribe({
      next: (response) => {
        this.filteredProducts = response;
      }
    });
  }

  toggleWishlist(product: Products): void {
    if (this.isInWishlist(product)) {
      this.removeFromWishlist(product);
    } else {
      this.addToWishlist(product);
    }
  }

  isInWishlist(product: Products): boolean {
    return this.wishlist.some((item: any) => item.id === product.id);
  }

  addToWishlist(product: Products): void {
    this.wishlist.push(product);
    // حفظ قائمة الرغبات في localStorage
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  removeFromWishlist(product: Products): void {
    this.wishlist = this.wishlist.filter((item: any) => item.id !== product.id);
    // تحديث قائمة الرغبات في localStorage
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
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
