import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseRecentCommentedComponent } from './database-recent-commented.component';

describe('DatabaseRecentCommentedComponent', () => {
  let component: DatabaseRecentCommentedComponent;
  let fixture: ComponentFixture<DatabaseRecentCommentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseRecentCommentedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseRecentCommentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
