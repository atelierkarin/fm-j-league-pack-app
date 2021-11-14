import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from '@ngx-translate/core';

import {
  NgbAlertModule,
  NgbCollapseModule,
  NgbNavModule,
  NgbAccordionModule,
  NgbDropdownModule,
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbModalModule,
  NgbToastModule,
  NgbProgressbarModule
} from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ImportCsvModalContentComponent } from "./import-csv-modal-content/import-csv-modal-content.component";
import { LoadingIndicatorComponent } from "./loading-indicator/loading-indicator.component";
import { CustomToastComponent } from './custom-toast/custom-toast.component';

@NgModule({
  declarations: [ImportCsvModalContentComponent, LoadingIndicatorComponent, CustomToastComponent],
  imports: [
    NgbAlertModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgxDatatableModule,
    NgbToastModule,
    NgbProgressbarModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgxDatatableModule,
    NgbToastModule,
    NgbProgressbarModule,

    LoadingIndicatorComponent,
    CustomToastComponent,
  ],
})
export class SharedModule {}
