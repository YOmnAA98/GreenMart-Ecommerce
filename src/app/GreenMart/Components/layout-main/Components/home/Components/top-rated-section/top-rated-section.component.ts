import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../../../../../Shared/Services/api-data.service';
import { Products } from '../../../../../../Shared/Interfaces/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-rated-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './top-rated-section.component.html',
  styleUrl: './top-rated-section.component.css'
})
export class TopRatedSectionComponent implements OnInit{
  inStock: boolean = true
  products: Products[] = [];
  constructor(private _apiDataService: ApiDataService){}
  ngOnInit(): void {
    this._apiDataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      }
    })
  }
}
