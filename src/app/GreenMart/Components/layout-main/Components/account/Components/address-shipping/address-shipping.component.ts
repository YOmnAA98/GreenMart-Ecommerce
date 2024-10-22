import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-shipping',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-shipping.component.html',
  styleUrl: './address-shipping.component.css'
})
export class AddressShippingComponent {

  countries: any[] = [];
  states: any[] = [];

  userShipData = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'EG', 
    state: '',
    streetAddress: '',
    town: '',
    postcode: '',
    phone: '',
    email: ''
  };
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.userShipData.firstName = localStorage.getItem('firstName') || '';
    this.userShipData.lastName = localStorage.getItem('lastName') || '';
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe(data => {
      this.countries = data
        .map(country => ({ code: country.cca2, name: country.name.common }))
        .sort((a, b) => a.name.localeCompare(b.name));
    });

    this.states = [
      { code: 'ALX', name: 'Alexandria' },
      { code: 'ASN', name: 'Aswan' },
      { code: 'AST', name: 'Asyut' },
      { code: 'BA', name: 'Beheira' },
      { code: 'BNS', name: 'Beni Suef' },
      { code: 'C', name: 'Cairo' },
      { code: 'DK', name: 'Dakahlia' },
      { code: 'DT', name: 'Damietta' },
      { code: 'FYM', name: 'Faiyum' },
      { code: 'GH', name: 'Gharbia' },
      { code: 'GZ', name: 'Giza' },
      { code: 'IS', name: 'Ismailia' },
      { code: 'KFS', name: 'Kafr El Sheikh' },
      { code: 'LX', name: 'Luxor' },
      { code: 'MT', name: 'Matruh' },
      { code: 'MN', name: 'Minya' },
      { code: 'MNF', name: 'Monufia' },
      { code: 'NS', name: 'New Valley' },
      { code: 'PTS', name: 'Port Said' },
      { code: 'KB', name: 'Qalyubia' },
      { code: 'KN', name: 'Qena' },
      { code: 'SHR', name: 'Sharqia' },
      { code: 'SIN', name: 'North Sinai' },
      { code: 'SYN', name: 'South Sinai' },
      { code: 'SUZ', name: 'Suez' },
      { code: 'RS', name: 'Red Sea' },
      { code: 'SW', name: 'Sohag' }
    ];
  }
  saveAddress(): void {
    localStorage.setItem('shippingAddress', JSON.stringify(this.userShipData));
    this.router.navigate(['/my-account/edit-address']);
  }

}

