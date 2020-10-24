import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerHistoryComponent } from './admin-player-history.component';

describe('AdminPlayerHistoryComponent', () => {
  let component: AdminPlayerHistoryComponent;
  let fixture: ComponentFixture<AdminPlayerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlayerHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
