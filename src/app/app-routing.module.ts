import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { HistoryComponent } from './history/history.component';
import { GuideComponent } from './guide/guide.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';
import { DiscussBoardComponent } from './discuss-board/discuss-board.component';

import { HistoryResolverService } from './history/history-resolver.service';

import { FmVersionGuard } from './shared/fm-version-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [FmVersionGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [FmVersionGuard] },
  { path: 'guide', component: GuideComponent, resolve: [HistoryResolverService], canActivate: [FmVersionGuard] },
  { path: 'playerUpdate', component: PlayerUpdateComponent },
  { path: 'discuss', component: DiscussBoardComponent},
  { path: 'calcCa', loadChildren: () => import('./calc-ca/calc-ca.module').then(m => m.CalcCaModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule],
  providers: [
    FmVersionGuard
  ]
})
export class AppRoutingModule { }
