import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DatapackFiletype } from "../../shared/datapack-filetype.enum";

import { ImportCsvModalContentComponent } from '../../shared/import-csv-modal-content/import-csv-modal-content.component'

import * as moment from 'moment';

import { ClubData } from "../../shared/database-filetype";

import * as fromApp from "../../store/app.reducer";
import * as DatabaseActions from "../../database/store/database.actions";
import * as SharedActions from "../../shared/store/shared.actions";

@Component({
  selector: 'app-admin-csv-import',
  templateUrl: './admin-csv-import.component.html',
  styleUrls: ['./admin-csv-import.component.css']
})
export class AdminCsvImportComponent implements OnInit, OnDestroy {

  public clubList: ClubData[];

  public loadData: Array<any> = null;
  public displayData: Array<any> = null;

  public updateId: number = null;

  public isUpdating: boolean = false;

  public datepackFileType: number = 0;
  public datepackFileTypeList: { key: number; val: string }[];

  public filterValue: string = "";
  public filterClub: number = null;
  public filterLimitToRecent: boolean = false;

  private coreSubscription: Subscription;
  private databaseSubscription: Subscription;

  public successList: string[] = [];
  public failureList: string[] = [];
  public updatingRecord: string = null;

  public getRowClass;

  constructor(private modal$: NgbModal, private store$: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.datepackFileTypeList = Object.keys(DatapackFiletype)
      .map(Number)
      .filter(Number.isInteger)
      .map((k) => ({ key: k, val: DatapackFiletype[k] }));
    
    this.coreSubscription = this.store$.select("core").subscribe((coreState) => {
      this.clubList = coreState.clubs;
    });    
    this.databaseSubscription = this.store$
      .select("database")
      .subscribe((databaseState) => {
        if (this.isUpdating) {
          const loading = databaseState.loading;
          if (!loading) {
            this.isUpdating = false;

            if (this.updatingRecord !== null) {
              this.failureList.filter(item => item !== this.updatingRecord);
              this.successList.push(this.updatingRecord);
              this.updatingRecord = null;
            }

            this.store$.dispatch(new SharedActions.SetToastContent({
              content: "レコードを更新しました",
              style: "success"
            }));
          }
        }
        if (databaseState.errMsg) {
          if (this.updatingRecord !== null) {
            this.successList.filter(item => item !== this.updatingRecord);
            this.failureList.push(this.updatingRecord);
            this.updatingRecord = null;
          }

          this.store$.dispatch(new SharedActions.SetToastContent({
            content: databaseState.errMsg,
            style: "danger"
          }));
        }
      });    

    this.getRowClass = (row) => {
      const id = row[""];
      return {
        'update-success': this.successList.includes(id),
        'update-failure': this.failureList.includes(id),
      };
    }
  }

  ngOnDestroy() {
    if (this.coreSubscription) {
      this.coreSubscription.unsubscribe();
    }
    if (this.databaseSubscription) {
      this.databaseSubscription.unsubscribe();
    }
  }

  onUploadFiles(files: any) {
    if (files.length <= 0) { return; }
    let f = files[0];

    this.readFile(f).then((data) => {
      this.loadData = this.csvToJson(data);
      this.loadData = this.loadData.filter(data => data.common_name || data.first_name || data.last_name);
      this.displayData = [...this.loadData];
    })
  }

  onUploadNameFilters(files: any) {
    if (files.length <= 0) { return; }
    let f = files[0];
    const limit = this.filterLimitToRecent;
    const filterClub = this.filterClub;

    this.readFile(f).then((data) => {
      var filters = data.split(/\r?\n/).filter(x => x).map(x => x.trim().toLowerCase());
      
      // filter our data
      const displayData = this.loadData.filter(function (d) {
        let club_filter = filterClub > 0 ? parseInt(d.club) === filterClub : true;
        let extra_filter = true;
        if (limit) {
          const clubDateRenewedMonth = moment().diff(moment(moment(d.clubDateRenewed)), 'month');
          extra_filter = clubDateRenewedMonth < 6;
          if (d.loanDateStart != "") {
            const loanDateStartMonth = moment().diff(moment(moment(d.loanDateStart)), 'month');
            extra_filter = clubDateRenewedMonth < 6 || loanDateStartMonth < 6;
          }
        }
        return filters.includes(d.common_name.toLowerCase()) && club_filter && extra_filter
      });

      // update the rows
      this.displayData = displayData;
    })
  }

  updateFilter(event) {
    const val = this.filterValue.trim().toLowerCase();
    const limit = this.filterLimitToRecent;
    const filterClub = this.filterClub;

    // filter our data
    const displayData = this.loadData.filter(function (d) {
      let club_filter = filterClub > 0 ? parseInt(d.club) === filterClub : true;
      let extra_filter = true;
      if (limit) {
        const clubDateRenewedMonth = moment().diff(moment(moment(d.clubDateRenewed)), 'month');
        extra_filter = clubDateRenewedMonth < 6;
        if (d.loanDateStart != "") {
          const loanDateStartMonth = moment().diff(moment(moment(d.loanDateStart)), 'month');
          extra_filter = clubDateRenewedMonth < 6 || loanDateStartMonth < 6;
        }
      }
      return d.common_name.toLowerCase().indexOf(val) !== -1 && club_filter && extra_filter
    });

    // update the rows
    this.displayData = displayData;
  }

  onDoAnalysis(data, directUpdate = false, directCreate = false) {
    const modalRef = this.modal$.open(ImportCsvModalContentComponent, { scrollable: true })
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.datafileType = this.datepackFileType;
    modalRef.componentInstance.updateId = this.updateId;
    modalRef.componentInstance.directUpdate = directUpdate;
    modalRef.componentInstance.directCreate = directCreate;
    this.updatingRecord = data[""];
    modalRef.result.then((result) => {
      this.isUpdating = true;
      this.store$.dispatch(new DatabaseActions.UpdatePlayer(result));
    }, (dismiss) => {});
  }

  private readFile(file): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  private csvToJson(csv): Array<any> {
    var lines = csv.split("\n");
    var result = [];
    var headers;
    headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};

        if(lines[i] == undefined || lines[i].trim() == "") {
            continue;
        }
        var words = lines[i].split(",");
        for(var j = 0; j < words.length; j++) {
            obj[headers[j].trim()] = words[j];
        }

        result.push(obj);
    }
    return result;
  }

}
