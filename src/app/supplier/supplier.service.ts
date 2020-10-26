import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from './model/supplier';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSupplierList(pageR: number, rowsR: number, searchTermR: string = ''): Observable<Supplier[]>{
   return this.http.post<Supplier[]>(`${environment.urlSevice}/supplier/GetPaginatedSupplier`,
                                    {page: pageR, rows: rowsR, searchTerm: searchTermR});
  }
}
