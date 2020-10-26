import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { OrderContainerService } from '../order-container/order-container.service';
import { OrderList } from '../models/order-list';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, AfterViewInit {

  orderId: number;
  orderItem: OrderList = new OrderList();
  detailColumns: object[] = [];
  constructor(private ref: ChangeDetectorRef, private serviceOrderContainer: OrderContainerService, private route: ActivatedRoute,
              private authService: AuthService) { }

  ngAfterViewInit(): void {
    this.detailColumns = this.getDetailsColumns();
    this.ref.detectChanges();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      {
        this.orderId = params.id;
        this.getOrderById(params.id);
      });
  }

 getOrderById(orderId: number): void{
   this.serviceOrderContainer.getOrderById(orderId)
   .subscribe(response =>
    {
      this.orderItem = response;
    });

 }
 goBack(){
   this.authService.goBack();
 }

 getDetailsColumns(): object[] {
  return [
    {
      name: 'Product',
      flexGrow: 0.5,
      prop: 'productName'
    },
    {
      name: 'Unit Price',
      flexGrow: 0.5,
      prop: 'unitPrice'
    },
    {
      name: 'Quantity',
      flexGrow: 0.5,
      prop: 'quantity'
    }
  ];
}

}
