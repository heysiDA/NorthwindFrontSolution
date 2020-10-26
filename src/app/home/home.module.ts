import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './home-container/home-container.component';
import { HomeOptionComponent } from './home-option/home-option.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [HomeComponent, HomeContainerComponent, HomeOptionComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
