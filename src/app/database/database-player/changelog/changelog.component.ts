import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from "../../../store/app.reducer";
import * as ChangelogActions from "./store/changelog.actions";

import { PlayerDataChangelog } from "../../../data/fmJDatabase/PlayerDataChangelog.interface";

import { playerDataGeneralForm } from "../../../admin/admin-player-db/form.data";

import * as moment from 'moment';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit, OnDestroy {

  @Input() playerId: string;
  
  public changelog: PlayerDataChangelog[];

  private loadedPlayerId: string;
  private changelogSubscription: Subscription;

  private changelogData;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.playerId && this.playerId !== this.loadedPlayerId) {
      this.store.dispatch(new ChangelogActions.LoadPlayerChangelog(this.playerId))
    }
    this.changelogSubscription = this.store
      .select("changelog")
      .subscribe(changelogState => {
        this.changelog = changelogState.changelog ? changelogState.changelog.sort((a,b) => b.updateDate - a.updateDate) : []
      });

    this.changelogData = [
      ...playerDataGeneralForm.map(d => ({
        tag: ["playerData","general",d.key],
        name: "基本能力 " + d.name
      }))
    ]
  }

  ngOnDestroy() {
    this.store.dispatch(new ChangelogActions.ResetSearch());
    if (this.changelogSubscription) {
      this.changelogSubscription.unsubscribe();
    }
    this.loadedPlayerId = null;
  }

  formatDateString(dateNum: number) {
    return moment(dateNum).format("YYYY-MM-DD HH:mm:ss");
  }

  analyzeChangelog(changelogString: string) {
    try {
      const changelogObj = JSON.parse(changelogString);
      return changelogObj.map(cl => {
        const type = this.getChangelogType(cl.kind);
        const updateName = this.getChangelogPathName(cl.path);
        return {
          type,
          updateName,
          before: cl.lhs,
          after: cl.rhs,
          isNumeric: (typeof cl.lhs == 'number' || typeof cl.rhs == 'number')
        }
      }).filter(v => v.updateName)
    } catch (err) {
      return null;
    }
  }

  getChangelogType(kind: string) {
    if (kind === "E") return "変更";
    if (kind === "D") return "削除";
    if (kind === "N") return "追加";
    return "不明";
  }

  getChangelogPathName(path: Array<string>) {
    const pathString = JSON.stringify(path);
    const findPathStringObj = this.changelogData.find(d => JSON.stringify(d.tag) === pathString);
    return findPathStringObj ? findPathStringObj.name : null;
  }

}
