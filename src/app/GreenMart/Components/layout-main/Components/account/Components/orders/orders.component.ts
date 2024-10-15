import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Orders } from '../../../../../../Shared/Interfaces/orders';
import { OrdersService } from '../../../../../../Shared/Services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit{
  orderList: Orders[] = [];
  constructor(private _orderService: OrdersService) {}
  ngOnInit(): void {
    this._orderService.getOrders().subscribe({
      next: (response) => {
        this.orderList = response;        
      }
    })
  }
}
