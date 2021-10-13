import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeFormComponent } from './trade-form.component';
import { TradeFormRoutingModule } from './trade-form-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TradeFormComponent
  ],
  imports: [
    CommonModule, TradeFormRoutingModule, SharedModule
  ]
})
export class TradeFormModule { }
