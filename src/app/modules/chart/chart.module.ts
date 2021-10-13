import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartRoutingModule } from './chart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule, ChartRoutingModule, SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class ChartModule { }
