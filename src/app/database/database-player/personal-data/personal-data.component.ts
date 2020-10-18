import { Component, OnInit, Input } from '@angular/core';

interface Status {
  name: string;
  value: string;
}

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
  @Input() personal: {
    adaptability?: number;
    ambition?: number;
    controversy?: number;
    loyalty?: number;
    perssure?: number;
    professionalism?: number;
    sportsmanship?: number;
    temperament?: number;
  };

  public personalDataList: Status[] = [
    { value: 'adaptability', name: '環境適応'},
    { value: 'ambition', name: '野心'},
    { value: 'controversy', name: '議論好き'},
    { value: 'loyalty', name: '忠誠心'},
    { value: 'perssure', name: 'プレッシャー'},
    { value: 'professionalism', name: 'プロ意識'},
    { value: 'sportsmanship', name: 'スポーツマンシップ'},
    { value: 'temperament', name: '気性'},
  ]

  constructor() { }

  ngOnInit() {
  }

  getStatusValue(status: Status): number {
    return this.personal && status.value in this.personal && this.personal[status.value] ? this.personal[status.value] : null
  }

}
