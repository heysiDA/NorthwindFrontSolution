import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierContainerComponent } from './supplier-container/supplier-container.component';
import { SupplierListTableComponent } from './supplier-list-table/supplier-list-table.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { SupplierService } from './supplier.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SupplierContainerComponent, SupplierListTableComponent, SupplierCardComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [SupplierService]
})
export class SupplierModule { }
