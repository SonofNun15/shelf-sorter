import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ShelfRoutingModule } from './shelf-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ShelfRoutingModule,
  ]
})
export class ShelfModule { }
