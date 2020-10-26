import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
// import { CustomerModule } from './customer/customer.module';
// import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    // loadChildren: 'src/app/home/home.module#HomeModule',
    canLoad: [AuthGuard]
   },
   {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    // loadChildren: 'src/app/customer/customer.module#CustomerModule',
    canLoad: [AuthGuard]
   },
   {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    // loadChildren: 'src/app/customer/customer.module#CustomerModule',
    canLoad: [AuthGuard]
   },
   {
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
    // loadChildren: 'src/app/customer/customer.module#CustomerModule',
    canLoad: [AuthGuard]
   },
   {
    path: 'login',
    component: LoginComponent
   },
   {
    path: 'logout',
    component: LogoutComponent
   },
  {
    path: '',
    redirectTo: '/login', pathMatch: 'full'
  },
   {
    path: '**',
    component: NotFoundComponent
   }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
