import { Component, OnInit, Input } from '@angular/core';

import { LeagueData } from '../../shared/database-filetype'

import { getPAUpperLimit } from "../../shared/common";

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.css']
})
export class StatusBadgeComponent implements OnInit {
  @Input() value: number;
  @Input() subtitle: string;
  @Input() league: LeagueData;
  @Input() max: number;
  @Input() invert: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass() {
    let value = this.value;
    if (value < 0) {
      value = getPAUpperLimit(this.value);
    }
    if (!value) return "badge-secondary";
    if (this.league) {
      if (!this.league.leagueCaGuideline) return "badge-secondary";
      const leagueGuideline = this.league.leagueCaGuideline;
      if (leagueGuideline && Array.isArray(leagueGuideline)) {
        if (leagueGuideline.length !== 4) return "avereage-ca";
        if (value >= leagueGuideline[0]) return "badge-success";
        else if (value >= leagueGuideline[1]) return "badge-success";
        else if (value >= leagueGuideline[2]) return "badge-info";
        else if (value >= leagueGuideline[3]) return "badge-warning";
        else return "badge-danger"
      } else {
        return "badge-secondary";
      }
    } else if (this.max > 0 && this.invert === true) {
      if (this.value >= this.max * 0.75) return "badge-danger";
      else if (this.value >= this.max * 0.5) return "badge-warning";
      else if (this.value >= this.max * 0.25) return "badge-info";
      else return "badge-success"
    } else if (this.max > 0) {
      if (this.value >= this.max * 0.75) return "badge-success";
      else if (this.value >= this.max * 0.5) return "badge-info";
      else if (this.value >= this.max * 0.25) return "badge-warning";
      else return "badge-danger"
    } 
    return "badge-secondary";
  }

}
