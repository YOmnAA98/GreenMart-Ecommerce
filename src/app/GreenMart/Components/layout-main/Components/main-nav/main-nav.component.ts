// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ApiDataService } from '../../../../Shared/Services/api-data.service';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { Category } from '../../../../Shared/Interfaces/category';
// import { CartNavComponent } from '../cart/cart-nav/cart-nav.component';

// @Component({
//   selector: 'app-main-nav',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive, CommonModule, CartNavComponent],
//   templateUrl: './main-nav.component.html',
//   styleUrl: './main-nav.component.css'
// })
// export class MainNavComponent implements OnInit {
//   isShown: boolean = true;
//   isEmpty: boolean = true;
//   categories: Category[] = [];
//   loggedInUserEmail: string | null = null;

//   constructor(private _apiDataService: ApiDataService) {}

//   ngOnInit(): void {
//     this._apiDataService.getAllCategories().subscribe({
//       next: (response) => {
//         this.categories = response;
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });

  
//     this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
//     this.isShown = !this.loggedInUserEmail;
//   }

//   logout(): void {
//     localStorage.removeItem('loggedInUserEmail');
//     this.loggedInUserEmail = null;
//     this.isShown = true;
//   }
// }


















import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../../../Shared/Services/api-data.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Category } from '../../../../Shared/Interfaces/category';
import { CartNavComponent } from '../cart/cart-nav/cart-nav.component';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, CartNavComponent],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit {
  isShown: boolean = true;
  isEmpty: boolean = true;
  categories: Category[] = [];
  loggedInUserEmail: string | null = null;
  loggedInUserName: string | null = null;
  firstName: string | null = null;

  constructor(private _apiDataService: ApiDataService, private router: Router) {}

  ngOnInit(): void {
    this._apiDataService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.loggedInUserName = localStorage.getItem('loggedInUserName');
    this.firstName = this.loggedInUserName ? this.loggedInUserName.split(' ')[0] : null;
    this.isShown = !this.loggedInUserEmail;
  }

  logout(): void {
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserName');
    this.loggedInUserEmail = null;
    this.loggedInUserName = null;
    this.firstName = null;
    this.isShown = true;
    this.router.navigate(['/home']);
  }
}


