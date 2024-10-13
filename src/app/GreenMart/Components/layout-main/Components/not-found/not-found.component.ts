import { Component } from '@angular/core';
import { MainNavComponent } from "../main-nav/main-nav.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MainNavComponent, FooterComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  // imageUrl: string = 'assets/images/404/notfound.webp';
}







