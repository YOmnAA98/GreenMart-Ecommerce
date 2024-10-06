import { Component } from '@angular/core';
import { AppComponent } from "../../../../../app.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AppComponent, RouterOutlet],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
