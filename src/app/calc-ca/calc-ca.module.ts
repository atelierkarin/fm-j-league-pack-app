import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CalcCaComponent } from './calc-ca.component';
import { SharedModule } from '../shared/shared.module';

import { CalcCaRoutingModule } from './calc-ca-routing.module';

@NgModule({
  declarations: [CalcCaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild([{ path: '', component: CalcCaComponent }]),
    SharedModule,
    CalcCaRoutingModule
  ]
})
export class CalcCaModule {}