import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { GaService } from '../../shared/ga.service'

import * as fromApp from '../../store/app.reducer';
import * as HistoryActions from '../../history/store/history.actions';
import * as AdminActions from '../../admin/store/admin.actions';
import * as CoreActions from '../store/core.actions';

import { User } from '../../admin/user.model';

import * as VersionData from '../../data/VersionData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public user: User;
  public isAdmin: boolean;
  public fmVersion: string;

  public fmVersionList: string[] = VersionData.fmVersionList;
  public fmVersionDataList: VersionData.VersionData[] = VersionData.fmVersionDataList;
  public currentVersionData: VersionData.VersionData;

  private adminAuthSubscription: Subscription;
  private coreSubscription: Subscription;

  public isCollapsed: boolean = true;

  constructor(private store: Store<fromApp.AppState>, private gaService: GaService, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new HistoryActions.FetchHistory());
    this.adminAuthSubscription = this.store.select('admin').subscribe(adminState => {
      this.user = adminState.user;
      this.isAdmin = adminState.isAdmin;
    });
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;
      this.currentVersionData = this.getCurrentVersionData();
      if (!this.currentVersionData) this.router.navigate(['/playerUpdate']);
    })
  }

  onSetFMVersion(fmVersion: string) {
    this.gaService.sendEvent('User Action', 'click', 'Set FM Version', fmVersion);
    this.store.dispatch(new CoreActions.SetFMVersion(fmVersion));
    this.onResetCollapse();
  }

  ngOnDestroy() {
    if (this.adminAuthSubscription) {
      this.adminAuthSubscription.unsubscribe();
    }
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
  }

  getCurrentVersionData(): VersionData.VersionData {
    return this.fmVersionDataList.find((versionData: VersionData.VersionData) => versionData.fmVersion === this.fmVersion);
  }

  onGotoBlog() {
    const versionData = this.getCurrentVersionData();
    if (versionData) {
      this.gaService.sendEvent('User Action', 'click', 'Open URL', versionData.fmBlogUrl);
      this.openUrl(versionData.fmBlogUrl);
    }
  }

  onGotoDiscuss() {
    this.openUrl("https://zawazawa.jp/fm-j-league-pack/");
  }

  onResetCollapse() {
    if (this.isCollapsed === false) this.isCollapsed = true;
  }

  onLogout() {
    this.store.dispatch(new AdminActions.Logout());
  }

  // PRIVATE FUNCTIONS

  private openUrl(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }
}
