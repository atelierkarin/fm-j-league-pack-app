import { Component, Input, OnInit } from '@angular/core';

import { PlayerType } from "../../../shared/player-type.enum";

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit {
  @Input() staff: {
    id: number;
    name: string;
    nameEng: string;
    nationality: string;
    dob: string;
    job: PlayerType;
  }[];

  constructor() { }

  ngOnInit(): void {
  }

  getJobType(job: PlayerType) {
    return PlayerType[job]
  }

}
