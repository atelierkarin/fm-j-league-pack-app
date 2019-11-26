import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbAlertModule, NgbCollapseModule, NgbTabsetModule, NgbAccordionModule, NgbDropdownModule, NgbDatepickerModule, NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [NgbAlertModule, NgbCollapseModule, NgbTabsetModule, NgbAccordionModule, NgbDropdownModule, NgbDatepickerModule, NgbTypeaheadModule, NgbModalModule],
  exports: [CommonModule, NgbAlertModule, NgbCollapseModule, NgbTabsetModule, NgbAccordionModule, NgbDropdownModule, NgbDatepickerModule, NgbTypeaheadModule, NgbModalModule],
})
export class SharedModule {}
