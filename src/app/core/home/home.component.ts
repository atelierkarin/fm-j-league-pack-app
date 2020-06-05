import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';

import * as VersionData from '../../data/VersionData';

import anime from 'animejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public fmVersion: string;

  public fmVersionList: string[] = VersionData.fmVersionList;
  public fmVersionDataList: VersionData.VersionData[] = VersionData.fmVersionDataList;  
  public currentVersionData: VersionData.VersionData;

  public isOldVersion: boolean = false;
  public isPreReleaseVersion: boolean = false;
  public isBrowseUpdateHistory: boolean = false;

  private coreSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;
      this.currentVersionData = this.getCurrentVersionData();
      this.isOldVersion = this.currentVersionData ? this.currentVersionData.content.home.otherVersion !== undefined : false;
      this.isPreReleaseVersion = this.currentVersionData ? this.currentVersionData.content.home.betaVersion !== undefined : false;
      this.isBrowseUpdateHistory = this.currentVersionData ? this.currentVersionData.content.home.playerUpdateHistory !== undefined : false;
    })
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    let tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750
    });

    tl
      .add({
        targets: '.fm-j-league-pack-contents .basic',
        translateX: [1000, 0],
        opacity: [0, 1]
      })
      .add({
        targets: '.fm-j-league-pack-contents .note',
        translateX: [-1000, 0],
        opacity: [0, 1]
      })
  }

  getTitle() {
    return this.currentVersionData ? this.currentVersionData.content.home.title : "";
  }

  getSubtitle() {
    return this.currentVersionData ? this.currentVersionData.content.home.subtitle : "";
  }

  getLatestVersionNo() {
    return this.currentVersionData ? this.currentVersionData.content.home.latest.version : "";
  }

  getLatestVersionDate() {
    return this.currentVersionData ? this.currentVersionData.content.home.latest.updateDate : "";
  }

  getMainContent() {
    return this.currentVersionData ? this.currentVersionData.content.home.mainContent : "";
  }

  getNote() {
    return this.currentVersionData ? this.currentVersionData.content.home.note : "";
  }

  onDownload() {
    if (this.currentVersionData) this.openUrl(this.currentVersionData.content.home.latest.url);
  }

  onOldVersion() {
    if (this.currentVersionData) this.openUrl(this.currentVersionData.content.home.otherVersion.url);
  }

  onPreReleaseVersion() {
    if (this.currentVersionData) this.openUrl(this.currentVersionData.content.home.betaVersion.url);
  }

  onBrowseUpdateHistory() {
    if (this.currentVersionData) this.openUrl(this.currentVersionData.content.home.playerUpdateHistory.url);
  }

  // PRIVATE FUNCTIONS

  private openUrl(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  private getCurrentVersionData(): VersionData.VersionData {
    return this.fmVersionDataList.find((versionData: VersionData.VersionData) => versionData.fmVersion === this.fmVersion);
  }
}
