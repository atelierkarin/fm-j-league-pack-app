import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { AdminPlayerUpdateComponent } from './admin-player-update/admin-player-update.component';
import { AdminPlayerDbComponent } from './admin-player-db/admin-player-db.component';
import { AdminCsvImportComponent } from './admin-csv-import/admin-csv-import.component';
import { AdminPlayerHistoryComponent } from './admin-player-history/admin-player-history.component';

@NgModule({
  declarations: [AdminComponent, AdminLoginComponent, AdminMainComponent, AdminHistoryComponent, AdminPlayerUpdateComponent, AdminPlayerDbComponent, AdminCsvImportComponent, AdminPlayerHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild([{ path: '', component: AdminComponent }]),
    SharedModule,
    AngularFireAuthModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}