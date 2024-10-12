import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiDataService } from '../../../../Shared/Services/api-data.service';
import { Products } from '../../../../Shared/Interfaces/products';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SlicingPipe } from '../../../../Shared/Pipes/slicing.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxImageZoomModule, SlicingPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  inStock: boolean = true;
  inStockOverlay: boolean = true;
  inStockModal: boolean = true;

  productDetails: any = {};
  relatedProducts: Products[] = [];
  selectedProduct: any;
  
  constructor(private _activatedRoute: ActivatedRoute, private _apiDataService: ApiDataService) { }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        let productID: any = param.get('id');
        this._apiDataService.getProductById(productID).subscribe({
          next: (response) => {
            this.productDetails = response;
            if (this.productDetails.productQuantity === 0) {
              this.inStock = false;
            } else {
              this.inStock = true;
            }
          }
        })
      }
    })
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.relatedProducts = response.filter((product: any) => {
          return product.category.name === this.productDetails.category.name;
        })
        // this.relatedProducts.forEach((product: any) => {
        //   if(product.productQuantity === 0) {
        //     this.inStockOverlay = false;
        //   }else{
        //     this.inStockOverlay = true;
        //   }          
        // })
      }
    })
  }
  quickView(productID: any): void{
    this.selectedProduct = this.relatedProducts.find((product: any) => product.id === productID);
    if(this.selectedProduct.productQuantity === 0) {
      this.inStockModal = false;
    }else{
      this.inStockModal = true;
    }
  }
}
