import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderList } from '../models/order-list';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderContainerService {

  constructor(private http: HttpClient) { }

  getOrderList( page: number , rows: number): Observable<OrderList[]>{
     return this.http.get<OrderList[]>(`${environment.urlSevice}/order/GetPaginatedOrders/${page}/${rows}`);
  }

  getOrderById( orderId: number): Observable<OrderList>{
    return this.http.get<OrderList>(`${environment.urlSevice}/order/GetOrderById/${orderId}`);
 }
}
