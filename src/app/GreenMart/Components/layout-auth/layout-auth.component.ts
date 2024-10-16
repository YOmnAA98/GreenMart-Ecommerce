import { Component } from '@angular/core';
import { FooterComponent } from "../layout-main/Components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.css'
})
export class LayoutAuthComponent {

}
