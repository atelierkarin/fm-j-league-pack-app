import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from "../../../store/app.reducer";
import * as ChangelogActions from "./store/changelog.actions";

import * as ClubData from '../../../data/fmJDatabase/Clubs.data';
import { nationality } from '../../../shared/nationality';

import { PlayerDataChangelog } from "../../../data/fmJDatabase/PlayerDataChangelog.interface";

import { playerDataGeneralForm, nonPlayerDataGeneralForm, personalDataForm, playerDataMentalForm, playerDataPhysicalForm, playerDataTechnicalForm, playerDataGoalkeepingForm, playerDataPositionForm } from "../../../admin/admin-player-db/form.data";

import * as moment from 'moment';

const defaultChangelogData = [
  {
    tag: ["basicInfo","isPlayer"],
    name: "プレイヤー？"
  },
  {
    tag: ["basicInfo","isNonPlayer"],
    name: "ノンプレイヤー？"
  },
  {
    tag: ["clubInfo"],
    name: "クラブデータ"
  },
]

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
      ...defaultChangelogData,
      ...playerDataGeneralForm.map(d => ({
        tag: ["playerData","general",d.key],
        name: "基本能力 " + d.name
      })),
      ...nonPlayerDataGeneralForm.map(d => ({
        tag: ["playerData","general",d.key],
        name: "基本能力 " + d.name
      })),
      ...personalDataForm.map(d => ({
        tag: ["personalData",d.key],
        name: "性格 " + d.name
      })),
      ...playerDataMentalForm.map(d => ({
        tag: ["playerData","mental",d.key],
        name: "メンタル " + d.name
      })),
      ...playerDataPhysicalForm.map(d => ({
        tag: ["playerData","physical",d.key],
        name: "フィジカル " + d.name
      })),
      ...playerDataTechnicalForm.map(d => ({
        tag: ["playerData","technical",d.key],
        name: "スキル " + d.name
      })),
      ...playerDataGoalkeepingForm.map(d => ({
        tag: ["playerData","goalkeeping",d.key],
        name: "ゴールキーピング " + d.name
      })),
      ...playerDataPositionForm.map(d => ({
        tag: ["playerData","positions",d.key],
        name: "ポジション " + d.name
      })),      
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
      let realChangelog = [];
      changelogObj.forEach(cl => {
        if (cl.kind === "N" && typeof cl.rhs === "object") {
          for(let k of Object.keys(cl.rhs)) {
            realChangelog.push({
              ...cl,
              path: [...cl.path, k],
              rhs: cl.rhs[k]
            });
          }
        } else {
          realChangelog.push(cl);
        }
      })
      return realChangelog.map(cl => {
        const type = this.getChangelogType(cl.kind);
        const updateName = this.getChangelogPathName(cl.path);
        return {
          type,
          updateName,
          before: this.getStatus(cl.path, cl.lhs),
          after: cl.kind !== "D" ? this.getStatus(cl.path, cl.rhs) : null,
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

  getStatus(path, value) {
    const pathString = JSON.stringify(path);
    if (pathString === JSON.stringify(["clubInfo"])) {
      if (value === {}) return "なし";
      else {
        const targetClub = ClubData.Clubs.find(c => c.id === value.id);
        return targetClub ? targetClub.name : "クラブデータ無し";
      }
    }
    if (typeof value === "boolean") {
      if (value) return "はい";
      else return "いいえ";
    }
    return value;
  }

}
