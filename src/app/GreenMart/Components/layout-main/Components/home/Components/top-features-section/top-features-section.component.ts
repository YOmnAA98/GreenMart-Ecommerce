import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiDataService } from '../../../../../../Shared/Services/api-data.service';
import { Products } from '../../../../../../Shared/Interfaces/products';
import { Category } from '../../../../../../Shared/Interfaces/category';
import { SlicingPipe } from '../../../../../../Shared/Pipes/slicing.pipe';
import { ShoppingCartService } from '../../../../../../Shared/Services/shopping-cart.service';
import { Cart } from '../../../../../../Shared/Interfaces/cart';

@Component({
  selector: 'app-top-features-section',
  standalone: true,
  imports: [CommonModule, RouterLink, SlicingPipe],
  templateUrl: './top-features-section.component.html',
  styleUrl: './top-features-section.component.css'
})
export class TopFeaturesSectionComponent implements OnInit{
  inStock: boolean = true;  
  inStockModal: boolean = true  
  categories: Category[] = [];  
  filteredProducts: Products[] = []; 
  selectedProduct: any; 
  activeTab: number = 0;
  cartItems: Cart[] = [];
  constructor(private _apiDataService: ApiDataService, private _cartService: ShoppingCartService){}  
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
  }

  setActiveTab(tabId: number):void{
    this.activeTab = tabId;        
    
    this._apiDataService.getProductsByCategoryId(tabId).subscribe({
      next: (response) => {
        this.filteredProducts = response;        
      }
    })
  }

  quickView(productId: any): void {
    this.selectedProduct = this.filteredProducts.find((product: any) => product.id === productId);
    if(this.selectedProduct.productQuantity === 0) {
      this.inStockModal = false;
    }else{
      this.inStockModal = true;
    }
  }

  addToCart(product: Products, quantity: number): void {
    this._cartService.addToCart(product, quantity = 1).subscribe  ({
      next: (newItem) => {
        this.cartItems.push(newItem);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}