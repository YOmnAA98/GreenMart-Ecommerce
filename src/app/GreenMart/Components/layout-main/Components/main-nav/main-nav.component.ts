import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../../../Shared/Services/api-data.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Category } from '../../../../Shared/Interfaces/category';
@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit{
  isShown: boolean = true;
  isEmpty: boolean = true;
  categories: Category[] = [];
  constructor(private _apiDataService: ApiDataService){}

  ngOnInit(): void{
    this._apiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
