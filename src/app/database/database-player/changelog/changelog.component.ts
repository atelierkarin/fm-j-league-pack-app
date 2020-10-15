import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from "../../../store/app.reducer";

import { ClubData } from '../../../shared/database-filetype'
import { nationality } from '../../../shared/nationality';

import { PlayerData } from 'src/app/data/fmJDatabase/PlayerData.interface';

import * as moment from 'moment';

const normalUpdateRecords = {
  "player|player_name": "名前",
  "player|player_name_eng": "ローマ名前",
  "player_club|club_id": "所属クラブ",
  "player_club|date_renew": "契約更新",
  "player_club|squad_number": "背番号",
  "player_loan_club|club_id": "レンタルクラブ",
  "player_loan_club|date_start": "レンタル開始日",
  "player_loan_club|date_end": "レンタル終結日",
  "player_loan_club|squad_number": "レンタル先背番号",
}

const numberUpdateRecords = {
  "player_player_data_general|ca": "現在能力",
  "player_player_data_general|pa": "潜在能力",
  "player_player_data_general|current_reputation": "現在の知名度",
  "player_player_data_general|home_reputation": "ホームでの知名度",
  "player_player_data_general|world_reputation": "世界での知名度",
  "player_player_data_general|left_foot": "左足",
  "player_player_data_general|right_foot": "右足",
}

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit, OnDestroy {

  @Input() playerId: string;
  @Input() player: PlayerData;

  private clubs: ClubData[];

  private coreSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.clubs = coreState.clubs;
    })
  }

  ngOnDestroy() {
    if (this.coreSubscription)
      this.coreSubscription.unsubscribe();
  }

  formatDateString(dateNum: number) {
    return moment(dateNum).format("YYYY-MM-DD HH:mm:ss");
  }

  formatValue(value: string, rule: string) {
    if (rule === "club_id") {
      const club = this.clubs.find(c => c.id === parseInt(value));
      return club ? club.clubName : "フリー／所属不明"
    } else {
      return value;
    }
  }

  formatUpdateRecord(record: {
    recordTable: string
    recordField: string
    oldValue?: string
    newValue?: string
  }) {
    const tag = record.recordTable + "|" + record.recordField;
    if (Object.keys(normalUpdateRecords).includes(tag)) {
      return {
        title: normalUpdateRecords[tag],
        type: "normal",
        oldValue: this.formatValue(record.oldValue, record.recordField),
        newValue: this.formatValue(record.newValue, record.recordField)
      };
    } else if (Object.keys(numberUpdateRecords).includes(tag)) {
      return {
        title: numberUpdateRecords[tag],
        type: "number",
        oldValue: record.oldValue ? parseInt(record.oldValue) : 0,
        newValue: record.newValue ? parseInt(record.newValue) : 0
      };
    } else {
      return null;
    }    
  }
}
