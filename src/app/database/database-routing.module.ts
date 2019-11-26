import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabaseComponent } from './database.component';
import { DatabaseMainComponent } from './database-main/database-main.component';
import { DatabaseLeagueComponent } from './database-league/database-league.component';
import { DatabaseClubComponent } from './database-club/database-club.component';
import { DatabasePlayerComponent } from './database-player/database-player.component';

const adminRoutes: Routes = [
  { path: '', component: DatabaseComponent, children: [
    { path: '', component: DatabaseMainComponent },
    { path: 'league/:id', component: DatabaseLeagueComponent },
    { path: 'club/:alias', component: DatabaseClubComponent },
    { path: 'player', component: DatabasePlayerComponent },
  ] },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule],
})
export class DatabaseRoutingModule {}
