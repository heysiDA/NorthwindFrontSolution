import { Component, OnInit } from '@angular/core';
import { CustomerListService } from './customer-list.service';
import { Customer } from '../models/customer';
import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerListService]
})
export class CustomerListComponent implements OnInit {

  customerList: Customer[] = [];
  numberOfRecords = 0;
  pageSizeOptions: number[] = [9, 21, 42];
  pageSize = 9;
  pageIndex = 0;

  constructor(private customerListService: CustomerListService, public dialog: MatDialog) {
    this.getCustomer(1, this.pageSize);

  }

  ngOnInit(): void {

  }

  getCustomer(page: number, rows: number): void {
    this.customerListService.getCutomerList(page, rows)
      .subscribe(
        response => {
          this.customerList = response;
          this.numberOfRecords = response[0].totalRecords;
        });
  }

  changePage(event: any) {
    this.getCustomer(event.pageIndex + 1, event.pageSize);
  }

  newCustomer(): void {

    const dialogRef = this.dialog.open(CustomerCreateComponent, {
      panelClass: 'new-customer-modal-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomer(1, this.pageSize);
    });
  }

  editCustomer(idC: number): void {
    const dialogRef = this.dialog.open(CustomerCreateComponent, {
      panelClass: 'new-customer-modal-dialog',
      data: { id: idC }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomer(1, this.pageSize);
    });
  }

  customerDetail(idC: number): void {
    const dialogRef = this.dialog.open(CustomerDetailsComponent, {
      panelClass: 'new-customer-modal-dialog',
      data: { id: idC }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.getCustomer(1, this.pageSize);
    });
  }

}
