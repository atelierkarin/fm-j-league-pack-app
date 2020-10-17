import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseRecentUpdatesComponent } from './database-recent-updates.component';

describe('DatabaseRecentUpdatesComponent', () => {
  let component: DatabaseRecentUpdatesComponent;
  let fixture: ComponentFixture<DatabaseRecentUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseRecentUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseRecentUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
