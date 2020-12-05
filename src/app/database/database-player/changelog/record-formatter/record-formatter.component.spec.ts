import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFormatterComponent } from './record-formatter.component';

describe('RecordFormatterComponent', () => {
  let component: RecordFormatterComponent;
  let fixture: ComponentFixture<RecordFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordFormatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
