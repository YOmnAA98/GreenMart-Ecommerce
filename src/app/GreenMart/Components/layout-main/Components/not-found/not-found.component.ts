import { Component } from '@angular/core';
import { MainNavComponent } from "../main-nav/main-nav.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MainNavComponent, FooterComponent,],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  // imageUrl: string = 'assets/images/404/notfound.webp';
}







