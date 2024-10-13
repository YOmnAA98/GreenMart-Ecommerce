import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../../../../../Shared/Services/api-data.service';
import { Products } from '../../../../../../Shared/Interfaces/products';
import { RouterLink } from '@angular/router';
import { SlicingPipe } from '../../../../../../Shared/Pipes/slicing.pipe';

@Component({
  selector: 'app-top-rated-section',
  standalone: true,
  imports: [CommonModule, RouterLink, SlicingPipe],
  templateUrl: './top-rated-section.component.html',
  styleUrl: './top-rated-section.component.css'
})
export class TopRatedSectionComponent implements OnInit{
  inStock: boolean = true
  inStockModal: boolean = true
  products: Products[] = [];
  topRatedProducts: Products[] = [];
  selectedProduct: any
  constructor(private _apiDataService: ApiDataService){}
  ngOnInit(): void {
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.topRatedProducts = this.products.filter((product) => {
          return product.ratingsAverage > 4.5;
        })
      },
      error: (error) => {
        console.log(error);
      },
    })    
  }
  quickView(productId: any): void {
    this.selectedProduct = this.topRatedProducts.find((product: any) => product.id === productId);
    if(this.selectedProduct.productQuantity === 0) {
      this.inStockModal = false;
    }else{
      this.inStockModal = true;
    }
  }
}
