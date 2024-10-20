// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { AppComponent } from "../../../../../app.component";
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-account',
//   standalone: true,
//   imports: [AppComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
//   templateUrl: './account.component.html',
//   styleUrl: './account.component.css'
// })
// export class AccountComponent implements OnInit {

//   @Output() textChange = new EventEmitter<string>();

//   headerText: string = 'My account'; 

//   constructor() { }

//   ngOnInit(): void {}

//   onLinkClick(newText: string): void {
//     this.textChange.emit(newText);  
//     this.updateHeader(newText);     
//   }

//   updateHeader(newText: string): void {
//     this.headerText = newText;
//   }
// }




import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from "../../../../../app.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AppComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  @Output() textChange = new EventEmitter<string>();

  headerText: string = 'My account';
  loggedInUserEmail: string | null = null;
  loggedInUserName: string | null = null;
  firstName: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.loggedInUserName = localStorage.getItem('loggedInUserName');
    this.firstName = this.loggedInUserName ? this.loggedInUserName.split(' ')[0] : null;
    this.isLoggedIn = !!this.loggedInUserEmail;
  }

  onLinkClick(newText: string): void {
    this.textChange.emit(newText);
    this.updateHeader(newText);
  }

  updateHeader(newText: string): void {
    this.headerText = newText;
  }

  logout(): void {
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserName');
    this.loggedInUserEmail = null;
    this.loggedInUserName = null;
    this.firstName = null;
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}


