import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductDetailsComponent } from '../../Components/layout-main/Components/product-details/product-details.component';
import { Products } from '../Interfaces/products';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  subject = new Subject ()

  constructor() { }
  
  sendMsg(Products: Products){
    this.subject.next(Products)
  }
  getMsg(){
    return this.subject.asObservable()
  }
}
