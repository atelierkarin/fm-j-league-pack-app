import { Component, OnInit, Input } from '@angular/core';

import { LeagueData } from '../../../shared/database-filetype'

@Component({
  selector: 'app-club-status',
  templateUrl: './club-status.component.html',
  styleUrls: ['./club-status.component.css']
})
export class ClubStatusComponent implements OnInit {
  @Input() clubStatus: {
    overall?: number;
    attack?: number;
    midfield?: number;
    defence?: number;
  }
  @Input() league: LeagueData

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(ca) {
    if (!ca) return "badge-secondary";
    if (!this.league.leagueCaGuideline) return "badge-secondary";
    const leagueGuideline = this.league.leagueCaGuideline;
    if (leagueGuideline && Array.isArray(leagueGuideline)) {
      if (leagueGuideline.length !== 4) return "avereage-ca";
      if (ca >= leagueGuideline[0]) return "badge-success";
      else if (ca >= leagueGuideline[1]) return "badge-success";
      else if (ca >= leagueGuideline[2]) return "badge-info";
      else if (ca >= leagueGuideline[3]) return "badge-warning";
      else return "badge-danger"
    } else {
      return "badge-secondary";
    }
  }

}
