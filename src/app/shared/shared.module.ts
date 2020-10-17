import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  NgbAlertModule,
  NgbCollapseModule,
  NgbNavModule,
  NgbTabsetModule,
  NgbAccordionModule,
  NgbDropdownModule,
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbModalModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ImportCsvModalContentComponent } from "./import-csv-modal-content/import-csv-modal-content.component";
import { LoadingIndicatorComponent } from "./loading-indicator/loading-indicator.component";

@NgModule({
  declarations: [ImportCsvModalContentComponent, LoadingIndicatorComponent],
  imports: [
    NgbAlertModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgxDatatableModule,
  ],
  exports: [
    CommonModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
    NgbModalModule,
    NgxDatatableModule,
    LoadingIndicatorComponent,
  ],
})
export class SharedModule {}
