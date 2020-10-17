import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseAllClubsComponent } from './database-all-clubs.component';

describe('DatabaseAllClubsComponent', () => {
  let component: DatabaseAllClubsComponent;
  let fixture: ComponentFixture<DatabaseAllClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseAllClubsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseAllClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
