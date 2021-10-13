import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeFormComponent } from './trade-form.component';

const routes: Routes = [
  {
    path: '',
    component: TradeFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeFormRoutingModule {}
