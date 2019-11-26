import { Component, OnInit, Input } from '@angular/core';

import { PlayerType } from '../../shared/player-type.enum';
import { DatapackFiletype } from '../../shared/datapack-filetype.enum';
import { nationality } from '../../shared/nationality';
import * as PlayerUpdateModel from '../player-update.model';

@Component({
  selector: 'app-player-update-card',
  templateUrl: './player-update-card.component.html',
  styleUrls: ['./player-update-card.component.css']
})
export class PlayerUpdateCardComponent implements OnInit {
  @Input() data: PlayerUpdateModel.PlayerUpdate;

  constructor() { }

  ngOnInit() {
  }

  getPlayerUpdateType(type) {
    return PlayerUpdateModel.PlayerUpdateType[type];
  }

  getPlayerType(type) {
    return PlayerType[type];
  }

  getDatapackFiletype(type) {
    return DatapackFiletype[type];
  }

  getPlayerUpdateTypeContentStyle(type) {
    switch (type) {
      case PlayerUpdateModel.PlayerUpdateType.追加:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.レンタル:
        return 1;
      case PlayerUpdateModel.PlayerUpdateType.レンタル延長:
        return 1;
      case PlayerUpdateModel.PlayerUpdateType.レンタル終了:
        return 2;
      case PlayerUpdateModel.PlayerUpdateType.契約更新:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.契約終了:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.移籍:
        return 3;
      case PlayerUpdateModel.PlayerUpdateType.将来の移籍:
        return 4;
      case PlayerUpdateModel.PlayerUpdateType.引退:
        return 0;
      case PlayerUpdateModel.PlayerUpdateType.役職変更:
        return 0;
      default:
        return -1
    }
  }

  getFlag(nat) {
    const targetNationality = nationality.find(n => n.code === nat)
    if (targetNationality) {
      return targetNationality.iso ? "flag-icon flag-icon-" + targetNationality.iso : ""
    }
    return ""
  }

  formattedRemarks(remark) {
    const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    const replacedText = remark.replace(replacePattern1, '<a href="$1" target="_blank">参考</a>');
    return replacedText;
  }

}
