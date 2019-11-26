import { PlayerType } from '../shared/player-type.enum';
import { DatapackFiletype } from '../shared/datapack-filetype.enum';

export enum PlayerUpdateType {
  "追加",
  "レンタル",
  "レンタル延長",
  "レンタル終了",  
  "移籍",
  "将来の移籍",
  "引退",
  "役職変更",
  "契約更新",
  "契約終了"
}

export interface PlayerUpdateClub {
  name: string,
  nationality: string,
}

export interface PlayerUpdatePlayer {
  fmID?: number,
  name: string,
  nameEng: string,
  playerType: PlayerType[],
  nationality: string
}

export interface PlayerUpdate {
  id?: string,
  fmVersion: string,
  player: PlayerUpdatePlayer,
  updateType: PlayerUpdateType,
  activeDate: string,
  updateDate: string,
  club: PlayerUpdateClub,
  previousClub?: PlayerUpdateClub,
  filetype: DatapackFiletype
  previousFiletype?: DatapackFiletype,
  futureTransfer?: {
    club: PlayerUpdateClub,
    transferDate: string
  },
  remarks?: string,
}