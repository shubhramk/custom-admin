import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAnswerComponent } from './global-answer.component';

describe('GlobalAnswerComponent', () => {
  let component: GlobalAnswerComponent;
  let fixture: ComponentFixture<GlobalAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
