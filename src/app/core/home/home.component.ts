import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';

import * as VersionData from '../../data/VersionData';

import anime from 'animejs';
import { Meta } from '@angular/platform-browser';

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

  constructor(private store: Store<fromApp.AppState>, private meta: Meta) {}

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;
      this.currentVersionData = this.getCurrentVersionData();
      this.isOldVersion = this.currentVersionData ? this.currentVersionData.content.home.otherVersion !== undefined : false;
      this.isPreReleaseVersion = this.currentVersionData ? this.currentVersionData.content.home.betaVersion !== undefined : false;
      this.isBrowseUpdateHistory = this.currentVersionData ? this.currentVersionData.content.home.playerUpdateHistory !== undefined : false;

      this.meta.addTag({name: "description", content: this.getSubtitle()});

      // Twitter用メタタグ
      this.meta.addTag({name: "twitter:card", content: "summary"});
      this.meta.addTag({name: "twitter:site", content: "@karinshiratori"});
      this.meta.addTag({name: "twitter:title", content: this.getTitle()});
      this.meta.addTag({name: "twitter:description", content: this.getSubtitle()});
      this.meta.addTag({name: "twitter:text:description", content: this.getSubtitle()});
    })
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    const textWrapper = document.querySelector('.page-title');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    const textWrapper2 = document.querySelector('.page-subtitle');
    textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline()
      .add({
        targets: '.page-title .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 40*i
      })
      .add({
        targets: '.page-subtitle .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 40*i
      })

    anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
      })
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
