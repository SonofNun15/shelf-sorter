import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcquireRoutingModule } from './acquire-routing.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    AcquireRoutingModule,
  ]
})
export class AcquireModule { }
