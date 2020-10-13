import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './admin-guard.service';
import { AdminLoginComponent } from './admin-login/admin-login.component'
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { AdminPlayerUpdateComponent } from './admin-player-update/admin-player-update.component';
import { AdminPlayerDbComponent } from './admin-player-db/admin-player-db.component';
import { AdminCsvImportComponent } from './admin-csv-import/admin-csv-import.component';

const adminRoutes: Routes = [
  { path: '', component: AdminMainComponent, canActivate: [AdminGuard], children: [
    { path: 'history', component: AdminHistoryComponent },
    { path: 'playerUpdate', component: AdminPlayerUpdateComponent },
    { path: 'playerDb', component: AdminPlayerDbComponent },
    { path: 'playerDb/:id', component: AdminPlayerDbComponent },
    { path: 'import', component: AdminCsvImportComponent },
  ] },
  { path: 'login', component: AdminLoginComponent },  
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AdminGuard
  ]
})
export class AdminRoutingModule {}
