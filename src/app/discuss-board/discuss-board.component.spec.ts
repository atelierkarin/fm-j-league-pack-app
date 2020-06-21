import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussBoardComponent } from './discuss-board.component';

describe('DiscussBoardComponent', () => {
  let component: DiscussBoardComponent;
  let fixture: ComponentFixture<DiscussBoardComponent>;

  beforeEach(async(() => {
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
