import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/add-or-edit-customer';
import { WhiteSpaceValidator } from 'src/app/shared/validators/white-space-validator';
import { CustomerCreateService } from './customer-create.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  newCustomerForm: FormGroup;
  customer: AddOrEditCustomer;
  titleForm = 'New customer';

  constructor(private fb: FormBuilder,
              private customerCreateService: CustomerCreateService,
              public dialogRef: MatDialogRef<CustomerCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data && data.id !== undefined && data.id !== null && data.id !== 0) {
      this.customerRetrieved(data.id);
    }
  }

  ngOnInit(): void {
    this.buidNewCustomerForm();
  }

  buidNewCustomerForm(): void {
    this.newCustomerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      // firstName: ['', [Validators.required, WhiteSpaceValidator.cannotContainSpace]],
      // lastName: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
      // city: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
      // country: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
      // phone: ['', Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])],
    });
  }

  createCustomer(): void {
    if (this.newCustomerForm.dirty && this.newCustomerForm.valid) {
      const c = Object.assign({}, this.customer, this.newCustomerForm.value);
      this.customerCreateService.createCustomer(c).subscribe(
        resp => {
          this.dialogRef.close();
        });
    } else if (!this.newCustomerForm.dirty) {
      this.newCustomerForm.reset();
    }
  }

  customerRetrieved(id: number): void {
    this.titleForm = 'Edit customer';
    this.customerCreateService.getCustomerById(id).subscribe(
      resp => {
        this.customer = resp;
        this.newCustomerForm.patchValue({
          firstName: resp.firstName,
          lastName: resp.lastName,
          city: resp.city,
          country: resp.country,
          phone: resp.phone
        });
      });
  }

  editCustomer(): void {
    if (this.newCustomerForm.dirty && this.newCustomerForm.valid) {
      const c = Object.assign({}, this.customer, this.newCustomerForm.value);
      c.id = this.data.id;
      this.customerCreateService.editCustomer(c).subscribe(
        resp => {
          this.dialogRef.close();
        });
    } else if (!this.newCustomerForm.dirty) {
      this.newCustomerForm.reset();
    }
  }
}
export interface DialogData {
  id: number;
}
