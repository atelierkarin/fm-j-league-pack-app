import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbAlertModule, NgbCollapseModule, NgbTabsetModule, NgbAccordionModule, NgbDropdownModule, NgbDatepickerModule, NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [],
  imports: [NgbAlertModule, NgbCollapseModule, NgbTabsetModule, NgbAccordionModule, NgbDropdownModule, NgbDatepickerModule, NgbTypeaheadModule, NgbModalModule, NgxDatatableModule],
  exports: [CommonModule, NgbAlertModule, NgbCollapseModule, NgbTabsetModule, NgbAccordionModule, NgbDropdownModule, NgbDatepickerModule, NgbTypeaheadModule, NgbModalModule, NgxDatatableModule],
})
export class SharedModule {}
