import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiscussBoardComponent } from './discuss-board.component';

describe('DiscussBoardComponent', () => {
  let component: DiscussBoardComponent;
  let fixture: ComponentFixture<DiscussBoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
