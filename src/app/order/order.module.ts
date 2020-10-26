import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderContainerComponent } from './order-container/order-container.component';
import { SharedModule } from '../shared/shared.module';
import { OrderContainerService } from './order-container/order-container.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [OrderContainerComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [OrderContainerService]
})
export class OrderModule { }
