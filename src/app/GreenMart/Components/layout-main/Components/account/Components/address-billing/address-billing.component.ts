import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-billing.component.html',
  styleUrl: './address-billing.component.css'
})
export class AddressBillingComponent {
  
  countries: any[] = [];
  states: any[] = [];

  userData = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'EG', 
    state: '',
    streetAddress: '',
    streetAddress2: '',
    postcode: '',
    phone: '',
    email: ''
  };
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {
    this.userData.firstName = localStorage.getItem('firstName') || '';
    this.userData.lastName = localStorage.getItem('lastName') || '';
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
    localStorage.setItem('billingAddress', JSON.stringify(this.userData));
    this.router.navigate(['/my-account/edit-address']);
  }

}
