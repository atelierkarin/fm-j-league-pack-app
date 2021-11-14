import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';

import * as fromApp from '../../store/app.reducer';

import * as VersionData from '../../data/VersionData';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public fmVersion: string;
  public lang: string;

  public fmVersionList: string[] = VersionData.fmVersionList;
  public fmVersionDataList: VersionData.VersionData[] = VersionData.fmVersionDataList;  
  public currentVersionData: VersionData.VersionData;

  public isOldVersion: boolean = false;
  public isPreReleaseVersion: boolean = false;

  private coreSubscription: Subscription;

  public param = {
    fmYear: '',
    latestVersion: '',
    releaseDate: ''
  };

  constructor(private store: Store<fromApp.AppState>, private meta: Meta, private translate: TranslateService) {
    translate.get('CORE.TITLE', this.param).subscribe((res: string) => {
      this.meta.addTag({name: "twitter:title", content: res});
    });
    translate.get('CORE.SUBTITLE', this.param).subscribe((res: string) => {
      this.meta.addTag({name: "description", content: res});
      this.meta.addTag({name: "twitter:description", content: res});
      this.meta.addTag({name: "twitter:text:description", content: res});
    });
  }

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;      
      this.lang = coreState.language;
      this.fmVersionDataList = VersionData.fmVersionDataList;
      this.currentVersionData = this.getCurrentVersionData();
      this.isOldVersion = this.currentVersionData ? this.currentVersionData.content.home.otherVersion !== undefined : false;
      this.isPreReleaseVersion = this.currentVersionData ? this.currentVersionData.content.home.betaVersion !== undefined : false;

      this.param = {
        fmYear: this.fmVersion.replace('FM', ''),
        latestVersion: this.currentVersionData ? this.currentVersionData.content.home.latest.version : "",
        releaseDate: this.currentVersionData ? this.currentVersionData.content.home.latest.updateDate : ""
      };

      // Twitter用メタタグ
      this.meta.addTag({name: "twitter:card", content: "summary"});
      this.meta.addTag({name: "twitter:site", content: "@karinshiratori"});
    })
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
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

  // PRIVATE FUNCTIONS

  private openUrl(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  private getCurrentVersionData(): VersionData.VersionData {
    return this.fmVersionDataList.find((versionData: VersionData.VersionData) => versionData.fmVersion === this.fmVersion);
  }
}
