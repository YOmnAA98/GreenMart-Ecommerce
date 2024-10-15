import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../../../Shared/Services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{
  orderDetails: any = {}
  constructor(private _activatedRoute: ActivatedRoute, private _orderService: OrdersService){}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        let orderId: any = param.get('id');
        this._orderService.getOrderById(orderId).subscribe({
          next: (response) => {
            this.orderDetails = response;            
          }
        })
      }
    });
  }
}
