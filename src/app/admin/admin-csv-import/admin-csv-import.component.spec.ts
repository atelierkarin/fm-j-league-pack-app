import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCsvImportComponent } from './admin-csv-import.component';

describe('AdminCsvImportComponent', () => {
  let component: AdminCsvImportComponent;
  let fixture: ComponentFixture<AdminCsvImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCsvImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCsvImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
