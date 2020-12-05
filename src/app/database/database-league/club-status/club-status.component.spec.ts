import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubStatusComponent } from './club-status.component';

describe('ClubStatusComponent', () => {
  let component: ClubStatusComponent;
  let fixture: ComponentFixture<ClubStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
