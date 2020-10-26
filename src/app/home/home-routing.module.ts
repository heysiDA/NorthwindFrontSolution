import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeContainerComponent } from './home-container/home-container.component';
import { HomeOptionComponent } from './home-option/home-option.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children:
    [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home2',
        component: HomeOptionComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
