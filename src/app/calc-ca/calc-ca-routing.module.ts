import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalcCaComponent } from './calc-ca.component';

const routes: Routes = [
  { path: '', component: CalcCaComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CalcCaRoutingModule {}
