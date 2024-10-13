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

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SlicingPipe, SearchPipe,TopRatedSectionComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  inStock: boolean = true;  
  inStockModal: boolean = true;
  categories: Category[] = [];
  products: Products[] = [];
  filteredProducts: Products[] = []; 
  selectedProduct: any; 
  activeTab: number = 0;
  searchText: string = '';
  constructor(private _apiDataService: ApiDataService){}
  ngOnInit():void{
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      }
    })
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
    this.selectedProduct = this.products.find((product: any) => product.id === productId);
    if(this.selectedProduct.productQuantity === 0) {
      this.inStockModal = false;
    }else{
      this.inStockModal = true;
    }
  }
}