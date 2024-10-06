import { Component } from '@angular/core';
import { MainNavComponent } from "./Components/main-nav/main-nav.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [RouterOutlet, MainNavComponent, FooterComponent],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.css'
})
export class LayoutMainComponent {

}
