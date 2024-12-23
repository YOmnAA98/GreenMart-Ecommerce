import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShoppingCartService } from '../../../../Shared/Services/shopping-cart.service';
import { Cart } from '../../../../Shared/Interfaces/cart';
import { Products } from '../../../../Shared/Interfaces/products';
import { OrdersService } from '../../../../Shared/Services/orders.service';
import { CartItem, Orders } from '../../../../Shared/Interfaces/orders';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: Cart[] = [];
  orders: Orders[] = [];
  countries: any[] = [];
  states: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _cartService: ShoppingCartService,
    private _orderService: OrdersService,
    private _router: Router,
    private http: HttpClient
  ) {
    this.checkoutForm = this._formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      postcode: [null, [Validators.required]],
      agreement: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this._cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
    const billingData = localStorage.getItem('billingAddress');
    if (billingData) {
      const parsedBillingData = JSON.parse(billingData);
      this.checkoutForm.patchValue(parsedBillingData);
    }
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

  onSubmit() {
    if (this.checkoutForm.valid) {
      const formValues = this.checkoutForm.value;
      const items: CartItem[] = this.cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        productName: item.product.productName,
        productPrice: item.product.productPrice,
      }));
      this._orderService.submitOrder(items, this.getTotalPrice(), formValues).subscribe({
          next: (response) => {
            this.orders.push(response);
            console.log(this.orders);
            this._orderService.clearCart(this.cartItems).subscribe({
              next: () => {
                this.cartItems = [];
                this._router.navigate(['/my-account/orders']);
              },
              error: (error) => {
                console.log(error);
              },              
            })
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  updateCartQuantity(itemId: number, product: Products,newQuantity: number): void {
    if (newQuantity < 1) {
      this.removeFromCart(itemId);
    }
    const cartItem = this.cartItems.find((item) => item.id === itemId);

    if (cartItem) {
      cartItem.quantity = newQuantity;
      this._cartService
        .updateCartItem(cartItem.id!, product, newQuantity).subscribe({
          next: () => {},
          error: (err) => {
            console.error('Failed to update cart item', err);
          },
        });
    } else {
      console.error('Cart item not found');
    }
  }

  removeFromCart(cartItemId: number): void {
    this._cartService.removeFromCart(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.id !== cartItemId);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      if (item && item.product && item.product.productPrice) {
        return total + item.product.productPrice * item.quantity;
      }
      return total;
    }, 0);
  }
}
