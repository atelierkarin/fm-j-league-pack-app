import { Component, OnInit, Input } from '@angular/core';

import { PlayerDataPosition } from "../../../data/fmJDatabase/PlayerData.interface";

@Component({
  selector: 'app-position-image',
  templateUrl: './position-image.component.html',
  styleUrls: ['./position-image.component.css']
})
export class PositionImageComponent implements OnInit {
  @Input() position: PlayerDataPosition;

  constructor() { }

  ngOnInit() {
  }

  getPositionClass(val) {
    return val ? {
      'pos': true,
      'pos-superb': val >= 17,
      'pos-good': val >= 15 && val < 17,
      'pos-normal': val >= 12 && val < 15,
      'pos-average': val >= 8 && val < 12,
      'pos-poor': val > 0 && val < 8,
    } : {
      'pos': true,
    }
    
  }

}
