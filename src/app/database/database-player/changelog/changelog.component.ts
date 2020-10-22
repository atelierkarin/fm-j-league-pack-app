import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromApp from "../../../store/app.reducer";

import { ClubData } from '../../../shared/database-filetype'
import { nationality } from '../../../shared/nationality';

import { PlayerData } from 'src/app/data/fmJDatabase/PlayerData.interface';

import * as moment from 'moment';

import { personalDataForm, playerDataGeneralForm, playerDataPositionForm, playerDataMentalForm, playerDataPhysicalForm, playerDataTechnicalForm, playerDataGoalkeepingForm, nonPlayerDataGeneralForm } from '../../../admin/admin-player-db/form.data';

const normalUpdateRecords = {
  "player|player_name": "名前",
  "player|player_name_eng": "ローマ名前",
  "player|player_dob": "生年月日",
  "player|player_nationality": "国籍",
  "player|datapack_file": "ファイル",
  "player|is_player": "プレイヤー",
  "player|is_non_player": "ノンプレイヤー",
  "player_club|club_id": "所属クラブ",
  "player_club|date_joined": "加入時期",
  "player_club|date_renew": "契約更新時期",
  "player_club|job": "職種",
  "player_club|squad_number": "背番号",
  "player_loan_club|club_id": "レンタルクラブ",
  "player_loan_club|date_start": "レンタル開始日",
  "player_loan_club|date_end": "レンタル終結日",
  "player_loan_club|squad_number": "レンタル先背番号",
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

  private numberUpdateRecords;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.coreSubscription = this.store.select('core').subscribe(coreState => {
      this.clubs = coreState.clubs;
    })
    this.setNumberTags();
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
      return club ? club.clubName : (value ? "所属不明" : "フリー")
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
    } else if (Object.keys(this.numberUpdateRecords).includes(tag)) {
      const oldValue = record.oldValue ? parseInt(record.oldValue) : 0;
      const newValue = record.newValue ? parseInt(record.newValue) : 0;
      if (oldValue !== newValue) return {
        title: this.numberUpdateRecords[tag],
        type: "number",
        oldValue,
        newValue,
      };
    } else {
      return null;
    }    
  }

  private tagFormatter(v, tableName) {
    const fieldName = v.key.replace(/\.?([A-Z]+)/g, '_$1').toLowerCase().replace(/^_/, "")
    const tag = tableName + "|" + fieldName
    this.numberUpdateRecords[tag] = v.name;
  }

  private setNumberTags() {
    this.numberUpdateRecords = {};
    personalDataForm.forEach(v => this.tagFormatter(v, "player_personal_data"))
    playerDataGeneralForm.forEach(v => this.tagFormatter(v, "player_player_data_general"))
    playerDataPositionForm.forEach(v => this.tagFormatter(v, "player_player_data_position"))
    playerDataMentalForm.forEach(v => this.tagFormatter(v, "player_player_data_mental"))
    playerDataPhysicalForm.forEach(v => this.tagFormatter(v, "player_player_data_physical"))
    playerDataTechnicalForm.forEach(v => this.tagFormatter(v, "player_player_data_technical"))
    playerDataGoalkeepingForm.forEach(v => this.tagFormatter(v, "player_player_data_goalkeeping"))
    nonPlayerDataGeneralForm.forEach(v => this.tagFormatter(v, "player_non_player_data_general"))
  }
}
