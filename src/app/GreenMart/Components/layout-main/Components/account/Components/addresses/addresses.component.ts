import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, RouterOutlet  } from '@angular/router';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToBilling() {
    this.router.navigate(['billing'], { relativeTo: this.route });
  }

  navigateToShipping() {
    this.router.navigate(['shipping'], { relativeTo: this.route });
  }
}
