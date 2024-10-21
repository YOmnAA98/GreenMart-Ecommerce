import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute, RouterOutlet  } from '@angular/router';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent {
  billingAddress: any = null;
  shippingAddress: any;
  

  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToBilling() {
    this.router.navigate(['billing'], { relativeTo: this.route });
  }

  navigateToShipping() {
    this.router.navigate(['shipping'], { relativeTo: this.route });
  }
  ngOnInit(): void {
    this.loadBillingAddress();
    const savedAddress = localStorage.getItem('shippingAddress');
  if (savedAddress) {
    this.shippingAddress = JSON.parse(savedAddress);
  }

  }
  loadBillingAddress(): void {
    const storedBillingAddress = localStorage.getItem('billingAddress');
    if (storedBillingAddress) {
      this.billingAddress = JSON.parse(storedBillingAddress);
    } else {
      this.billingAddress = null;
    }
  }

  deleteBillingAddress(): void {
    localStorage.removeItem('billingAddress');
    this.billingAddress = null;
  }
  deleteShippingAddress(): void {
    localStorage.removeItem('shippingAddress');
    this.shippingAddress = null;
  }

}
