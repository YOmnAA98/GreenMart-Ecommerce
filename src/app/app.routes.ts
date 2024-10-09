import { Routes } from '@angular/router';
import { LayoutMainComponent } from './GreenMart/Components/layout-main/layout-main.component';
import { LayoutAuthComponent } from './GreenMart/Components/layout-auth/layout-auth.component';
import { HomeComponent } from './GreenMart/Components/layout-main/Components/home/home.component';
import { RegisterLoginComponent } from './GreenMart/Components/layout-auth/Components/register-login/register-login.component';
import { ForgetPasswordComponent } from './GreenMart/Components/layout-auth/Components/forget-password/forget-password.component';
import { NotFoundComponent } from './GreenMart/Components/layout-main/Components/not-found/not-found.component';
import { AccountComponent } from './GreenMart/Components/layout-main/Components/account/account.component';
import { AccountDetailsComponent } from './GreenMart/Components/layout-main/Components/account/Components/account-details/account-details.component';
import { OrdersComponent } from './GreenMart/Components/layout-main/Components/account/Components/orders/orders.component';
import { AddressesComponent } from './GreenMart/Components/layout-main/Components/account/Components/addresses/addresses.component';
import { DownloadsComponent } from './GreenMart/Components/layout-main/Components/account/Components/downloads/downloads.component';
import { DashboardComponent } from './GreenMart/Components/layout-main/Components/account/Components/dashboard/dashboard.component';
import { AddressShippingComponent } from './GreenMart/Components/layout-main/Components/account/Components/address-shipping/address-shipping.component';
import { AddressBillingComponent } from './GreenMart/Components/layout-main/Components/account/Components/address-billing/address-billing.component';
import { AboutUsComponent } from './GreenMart/Components/layout-main/Components/about-us/about-us.component';
import { ContactUsComponent } from './GreenMart/Components/layout-main/Components/contact-us/contact-us.component';
import { ShopComponent } from './GreenMart/Components/layout-main/Components/shop/shop.component';
import { ProductDetailsComponent } from './GreenMart/Components/layout-main/Components/product-details/product-details.component';
import { CartComponent } from './GreenMart/Components/layout-main/Components/cart/cart.component';
import { WishlistComponent } from './GreenMart/Components/layout-main/Components/wishlist/wishlist.component';
import { CheckoutComponent } from './GreenMart/Components/layout-main/Components/checkout/checkout.component';
import { PolicyPrivacyComponent } from './GreenMart/Components/layout-main/Components/policy-privacy/policy-privacy.component';
import { TermsConditionsComponent } from './GreenMart/Components/layout-main/Components/terms-conditions/terms-conditions.component';
import { FaqsComponent } from './GreenMart/Components/layout-main/Components/faqs/faqs.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    title: 'GreenMart',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'GreenMart | Home',
      },
      {
        path: 'my-account',
        component: AccountComponent,
        title: 'GreenMart | Account',
        children: [
          {
            path: 'account-details',
            component: AccountDetailsComponent,
            title: 'GreenMart | Account Details',
          },
          {
            path: 'edit-address',
      component: AddressesComponent,
      title: 'GreenMart | Addresses',
      children: [
        {
          path: 'billing',
          component: AddressBillingComponent,
          title: 'GreenMart | Billing Address',
        },
        {
          path: 'shipping',
          component: AddressShippingComponent,
          title: 'GreenMart | Shipping Address',
        }
      ]
    },
    {
            path: 'dashboard',
            component: DashboardComponent,
            title: 'GreenMart | My Account'
          },
          {
            path: 'downloads',
            component: DownloadsComponent,
            title: 'GreenMart | My Account'
          },
          {
            path: 'orders',
            component: OrdersComponent,
            title: 'GreenMart | Orders',
          },
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        title: 'GreenMart | About Us'
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        title: 'GreenMart | Contact Us'
      },
      {
        path: 'shop',
        component: ShopComponent,
        title: 'GreenMart | Shop'
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
        title: 'GreenMart | Product'
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'GreenMart | Cart'
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'GreenMart | Wishlist'
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'GreenMart | Checkout'
      },
      {
        path: 'terms-and-conditions',
        component: TermsConditionsComponent,
        title: 'GreenMart | Terms and Conditions'
      },
      {
        path: 'policy-privacy',
        component: PolicyPrivacyComponent,
        title: 'GreenMart | Policy Privacy'
      },
      {
        path: 'faqs',
        component: FaqsComponent,
        title: 'GreenMart | FAQs'
      }
    ],
  },
  {
    path: '',
    component: LayoutAuthComponent,
    children:[
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full',
        title:'GreenMart | Account'
      },
      {
        path: 'account',
        component: RegisterLoginComponent,
        title:'GreenMart | Account'
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        title:'GreenMart | Forget Password'
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title:'GreenMart | Not Found'
  }
];
