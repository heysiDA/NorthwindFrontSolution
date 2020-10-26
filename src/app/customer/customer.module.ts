import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CustomerCreateService } from './customer-create/customer-create.service';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MaterialModule } from '../material.module';
// import {  } from 'jw-paginate';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [CustomerCreateService]
})
export class CustomerModule { }
