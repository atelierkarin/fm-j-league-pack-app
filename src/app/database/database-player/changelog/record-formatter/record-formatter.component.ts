import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-formatter',
  templateUrl: './record-formatter.component.html',
  styleUrls: ['./record-formatter.component.css']
})
export class RecordFormatterComponent implements OnInit {

  @Input() record: {
    title: string,
    type: string,
    oldValue: any,
    newValue: any
  }

  constructor() { }

  ngOnInit(): void {
  }

}
