import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../../../../Shared/Services/api-data.service';
import { Products } from '../../../../Shared/Interfaces/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  inStock: boolean = true
  productDetails: Products = {} as Products;  
  constructor(private _activatedRoute: ActivatedRoute, private _apiDataService: ApiDataService) { }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        let productID: any = param.get('id');
        this._apiDataService.getProductById(productID).subscribe({
          next: (response) => {
            this.productDetails = response;
          }
        })
      }
    })
  }  
}
