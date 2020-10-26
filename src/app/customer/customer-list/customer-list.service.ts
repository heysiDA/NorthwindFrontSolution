import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerListService {

  constructor( private http: HttpClient) { }

  getCutomerList(page: number, rows: number): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${environment.urlSevice}/customer/GetPaginatedCustomer/${page}/${rows}`);
  }


}
