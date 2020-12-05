import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCsvModalContentComponent } from './import-csv-modal-content.component';

describe('ImportCsvModalContentComponent', () => {
  let component: ImportCsvModalContentComponent;
  let fixture: ComponentFixture<ImportCsvModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCsvModalContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCsvModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
