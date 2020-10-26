import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderContainerComponent } from './order-container/order-container.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role.enum';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const orderRoutes: Routes = [
  {
    path: '',
    children:
    [
      {
        path: '',
        component: OrderContainerComponent
      },
      {
        path: 'detail/:id',
        component: OrderDetailComponent
      }
    ],
    canActivate: [AuthGuard],
    data: { expectedRole: Role.AdminSupplier }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule { }
