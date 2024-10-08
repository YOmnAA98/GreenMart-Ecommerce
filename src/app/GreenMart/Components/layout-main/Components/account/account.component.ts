import { Component } from '@angular/core';
import { AppComponent } from "../../../../../app.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AppComponent, RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}