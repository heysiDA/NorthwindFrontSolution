import { Component, OnInit, Inject } from '@angular/core';
import { CustomerCreateService } from '../customer-create/customer-create.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../customer-create/customer-create.component';
import { AddOrEditCustomer } from '../models/add-or-edit-customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: AddOrEditCustomer = new AddOrEditCustomer();
  constructor(private customerService: CustomerCreateService,
              public dialogRef: MatDialogRef<CustomerDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data && data.id !== undefined && data.id !== null && data.id !== 0) {
      this.customerRetrieved(data.id);
    }
  }

  ngOnInit(): void {
  }

  customerRetrieved(id: number): void {
    this.customerService.getCustomerById(id).subscribe(
      resp => {
        this.customer = resp;
      });
  }

}
