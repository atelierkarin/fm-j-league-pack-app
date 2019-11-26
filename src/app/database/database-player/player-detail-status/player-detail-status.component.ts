import { Component, OnInit, Input } from '@angular/core';

import { PlayerDataPosition, PlayerDataMental, PlayerDataPhysical, PlayerDataTechnical, PlayerDataGoalkeeping } from "../../../data/fmJDatabase/PlayerData.interface";

interface Status {
  name: string;
  type: string;
  value: string;
  anti?: boolean;
}

@Component({
  selector: 'app-player-detail-status',
  templateUrl: './player-detail-status.component.html',
  styleUrls: ['./player-detail-status.component.css']
})
export class PlayerDetailStatusComponent implements OnInit {
  @Input() position: PlayerDataPosition;
  @Input() mental: PlayerDataMental;
  @Input() physical: PlayerDataPhysical;
  @Input() technical: PlayerDataTechnical;
  @Input() goalkeeping: PlayerDataGoalkeeping;

  public isGoalKeeper: boolean;

  public skillList: Status[] = [
    { name: "クロス", type: "technical", value: "crossing" },
    { name: "コーナーキック", type: "technical", value: "corners" },
    { name: "タックル", type: "technical", value: "tackling" },
    { name: "テクニック", type: "technical", value: "technique" },
    { name: "ドリブル", type: "technical", value: "dribbling" },
    { name: "パス", type: "technical", value: "passing" },
    { name: "ファーストタッチ", type: "technical", value: "tackling" },
    { name: "フリーキック", type: "technical", value: "freeKicks" },
    { name: "ヘディング", type: "technical", value: "heading" },
    { name: "ペナルティキック", type: "technical", value: "penaltyTaking" },
    { name: "マーキング", type: "technical", value: "marking" },
    { name: "ロングシュート", type: "technical", value: "longShots" },
    { name: "ロングスロー", type: "technical", value: "longThrows" },
    { name: "決定力", type: "technical", value: "finishing" },
    { name: "多才さ", type: "technical", value: "versatility" },    
  ]

  public physicalList: Status[] = [
    { name: "ジャンプ到達点", type: "physical", value: "jumpingReach" },
    { name: "スタミナ", type: "physical", value: "stamina" },
    { name: "スピード", type: "physical", value: "pace" },
    { name: "バランス", type: "physical", value: "balance" },
    { name: "加速力", type: "physical", value: "acceleration" },
    { name: "強靭さ", type: "physical", value: "strength" },
    { name: "健康さ", type: "physical", value: "naturalFitness" },
    { name: "敏捷性", type: "physical", value: "agility" },
    { name: "負傷しやすさ", type: "physical", value: "injuryProneness", anti: true },
  ]

  public mentalList: Status[] = [
    { name: "オフ ザ ボール", type: "mental", value: "movement" },
    { name: "チームワーク", type: "mental", value: "teamWork" },
    { name: "ひらめき", type: "mental", value: "flair" },
    { name: "ポジショニング", type: "mental", value: "positioning" },
    { name: "リーダーシップ", type: "mental", value: "leadership" },
    { name: "運動量", type: "mental", value: "workRate" },
    { name: "視野", type: "mental", value: "vision" },
    { name: "集中力", type: "mental", value: "concentration" },
    { name: "勝利意欲", type: "mental", value: "determination" },
    { name: "積極性", type: "mental", value: "aggression" },
    { name: "判断力", type: "mental", value: "decisions" },
    { name: "勇敢さ", type: "mental", value: "bravery" },
    { name: "予測力", type: "mental", value: "anticipation" },
    { name: "冷静さ", type: "mental", value: "composure" },
    { name: "狡猾さ", type: "mental", value: "dirtiness", anti: true },
    { name: "重要な試合", type: "mental", value: "importantMatches" },
  ]

  public goalkeepingList: Status[] = [
    { name: "1対1", type: "goalkeeping", value: "oneOnOnes" },
    { name: "キック力", type: "goalkeeping", value: "kicking" },
    { name: "コーチング", type: "goalkeeping", value: "communication" },
    { name: "スローイング", type: "goalkeeping", value: "throwing" },
    { name: "パス", type: "technical", value: "passing" },
    { name: "パンチング傾向", type: "goalkeeping", value: "tendencyToPunch" },
    { name: "ハンドリング", type: "goalkeeping", value: "handling" },
    { name: "ファーストタッチ", type: "technical", value: "tackling" },
    { name: "奇抜さ", type: "goalkeeping", value: "eccentricity" },
    { name: "空中リーチ", type: "goalkeeping", value: "aerialAbility" },
    { name: "支配力", type: "goalkeeping", value: "commandOfArea" },
    { name: "反応", type: "goalkeeping", value: "reflexes" },
    { name: "飛び出し", type: "goalkeeping", value: "rushingOut" },
  ]

  public goalkeepingSkillList: Status[] = [
    { name: "テクニック", type: "technical", value: "technique" },
    { name: "フリーキック", type: "technical", value: "freeKicks" },
    { name: "ペナルティキック", type: "technical", value: "penaltyTaking" },
  ]

  constructor() { }

  ngOnInit() {
    this.isGoalKeeper = this.position !== undefined && this.position.goalkeeper !== undefined && this.position.goalkeeper > 0;
  }

  getStatusValue(status: Status): number | string {
    if (status.type === "technical") {
      return this.technical && status.value in this.technical ?this.technical[status.value] : "-"
    } else if (status.type === "mental") {
      return this.mental && status.value in this.mental ? this.mental[status.value] : "-"
    } else if (status.type === "physical") {
      return this.physical && status.value in this.physical ? this.physical[status.value] : "-"
    } else if (status.type === "goalkeeping") {
      return this.goalkeeping && status.value in this.goalkeeping ? this.goalkeeping[status.value] : "-"
    } 
    return "-"
  }

  getStatusClass(val: number | string, anti = false) {
    if (val === "-") return "avereage-status";
    else {
      if (anti) {
        if (val > 15) return "poor-status";
        else if (val > 10) return "avereage-status";
        else if (val > 5) return "good-status";
        else return "overrate-status";
      } else {    
        if (val > 15) return "overrate-status";
        else if (val > 10) return "good-status";
        else if (val > 5) return "avereage-status";
        else return "poor-status";
      }
    }
  }

}
