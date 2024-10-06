import { Component } from '@angular/core';
import { AuthNavComponent } from "./Components/auth-nav/auth-nav.component";
import { FooterComponent } from "../layout-main/Components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [RouterOutlet, AuthNavComponent, FooterComponent],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.css'
})
export class LayoutAuthComponent {

}
