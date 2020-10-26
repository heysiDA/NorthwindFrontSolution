import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Supplier } from '../model/supplier';

@Component({
  selector: 'app-supplier-list-table',
  templateUrl: './supplier-list-table.component.html',
  styleUrls: ['./supplier-list-table.component.css']
})
export class SupplierListTableComponent implements OnInit, AfterViewInit {

  @Input() items: Supplier[] = [];
  columns: object[] = [];

  constructor() { }
  ngAfterViewInit(): void {
    this.columns = this.getColumns();
  }

  ngOnInit(): void {
    this.columns = this.getColumns();
  }

  getColumns(): object[] {
    return [
      {
        name: 'Id',
        flexGrow: 0.5,
        prop: 'id'
      },
      {
        name: 'Company Name',
        flexGrow: 1,
        prop: 'companyName'
      },
      {
        name: 'Contact Name',
        flexGrow: 1,
        prop: 'contactName'
      },
      {
        name: 'City',
        flexGrow: 0.5,
        prop: 'city'
      }
    ];
  }

}
