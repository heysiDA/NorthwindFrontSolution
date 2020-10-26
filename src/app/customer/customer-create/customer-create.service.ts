import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddOrEditCustomer } from '../models/add-or-edit-customer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreateService {

  constructor(private http: HttpClient) { }

  createCustomer(data: AddOrEditCustomer): Observable<Response>{
    data.id = undefined;
    return this.http.post(`${environment.urlSevice}/customer`, data).pipe(
      map((response: any) => response)
    );
  }

  getCustomerById(id: number): Observable<AddOrEditCustomer>{
    return this.http.get<AddOrEditCustomer>(`${environment.urlSevice}/customer/${id}`);
  }

  editCustomer(data: AddOrEditCustomer): Observable<Response>{
    return this.http.put(`${environment.urlSevice}/customer`, data).pipe(
      map((response: any) => response)
    );
  }
}
