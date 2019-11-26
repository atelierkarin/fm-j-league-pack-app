import { Component, OnInit, Input } from '@angular/core';

import { History } from '../history.model'

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {
  @Input() history: History;

  constructor() { }

  ngOnInit() {
  }

}
