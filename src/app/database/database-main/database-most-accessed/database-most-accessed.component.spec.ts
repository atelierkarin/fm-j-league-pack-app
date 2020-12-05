import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseMostAccessedComponent } from './database-most-accessed.component';

describe('DatabaseMostAccessedComponent', () => {
  let component: DatabaseMostAccessedComponent;
  let fixture: ComponentFixture<DatabaseMostAccessedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseMostAccessedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseMostAccessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
