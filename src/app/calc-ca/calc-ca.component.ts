import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as CalcCaActions from './store/calc-ca.actions';

@Component({
  selector: 'app-calc-ca',
  templateUrl: './calc-ca.component.html',
  styleUrls: ['./calc-ca.component.css']
})
export class CalcCaComponent implements OnInit {

  @ViewChild("f", { static: true }) form: NgForm;

  public loading: boolean;
  public updateError: string;

  public calculatedCa: number;

  public pos: string;
  public leagueRep: number;

  public posList = [
    { name: "GK", value: "GK" },
    { name: "DF", value: "DF" },
    { name: "MF", value: "MF" },
    { name: "FW", value: "FW" },
  ]
  
  public leagueList = [
    { name: "北海道地域リーグ", value: 21 },
    { name: "東北地域リーグ1部", value: 28 },
    { name: "東北地域リーグ2部", value: 12 },
    { name: "関東地域リーグ1部", value: 32 },
    { name: "関東地域リーグ2部", value: 17 },
    { name: "北信越地域リーグ1部", value: 25 },
    { name: "北信越地域リーグ2部", value: 9 },
    { name: "東海地域リーグ1部", value: 29 },
    { name: "東海地域リーグ2部", value: 13 },
    { name: "関西地域リーグ1部", value: 29 },
    { name: "関西地域リーグ2部", value: 15 },
    { name: "中国地域リーグ", value: 25 },
    { name: "四国地域リーグ", value: 23 },
    { name: "九州地域リーグ", value: 29 },
  ]

  private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.store.select('calcCa').subscribe(state => {
      this.loading = state.loading;
      this.updateError = state.updateError;
      this.calculatedCa = state.ca;
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmitCreate(form: NgForm) {
    const value = {
      ...form.value,
      pos: this.pos,
      leagueRep: this.leagueRep
    }
    console.log(value);
    this.store.dispatch(new CalcCaActions.CalcCa(value)); 
  }

  private initForm() {
    this.form.dirty
    this.form.reset();
  }
}
