
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiDataService } from '../../../../Shared/Services/api-data.service';
import { Products } from '../../../../Shared/Interfaces/products';
import { WishlistService } from '../../../../../../app/wishlist.service';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SlicingPipe } from '../../../../Shared/Pipes/slicing.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxImageZoomModule, SlicingPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any = {};
  relatedProducts: any[] = [];
  inStock: boolean = true;
  inStockOverlay: boolean = true;
  selectedProduct: Products | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _apiDataService: ApiDataService, 
    private wishlistService: WishlistService 
  ) { }

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
        });
      }
    });

    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.relatedProducts = response.filter((product: any) => {
          return product.category.name === this.productDetails.category.name;
        });
        this.relatedProducts.forEach((product: any) => {
          if (product.productQuantity === 0) {
            this.inStockOverlay = false;
          } else {
            this.inStockOverlay = true;
          }
        });
      }
    });
  }

  
  addToWishlist(product: Products): void {
    if (product) {
      this.wishlistService.addToWishlist(product);
      alert(`${product.productName} added to wishlist!`);
    } else {
      console.error('Product is undefined');
    }
  }
  
  openProductModal(productId: number): void {
    this.selectedProduct = this.relatedProducts.find(product => product.id === productId);
  }
}
