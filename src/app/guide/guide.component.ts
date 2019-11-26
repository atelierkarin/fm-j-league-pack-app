import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

import * as Guide from '../data/Guide';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit, OnDestroy {

  public fmVersion: string;

  public guideList: Guide.Guide[] = Guide.fmGuide;
  public currentGuide: Guide.GuideContent[];

  private coreSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.fmVersion = coreState.fmVersion;
      this.currentGuide = this.getCurrentGuideContent();
    })
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
  }

  // PRIVATE FUNCTIONS

  private getCurrentGuideContent(): Guide.GuideContent[] {
    const curentGuide = this.guideList.find((guideInfo: Guide.Guide) => guideInfo.fmVersion === this.fmVersion);
    return curentGuide ? curentGuide.guideContent : null;
  }

}
