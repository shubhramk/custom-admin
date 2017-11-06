import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAnswerEditComponent } from './global-answer-edit.component';

describe('GlobalAnswerEditComponent', () => {
  let component: GlobalAnswerEditComponent;
  let fixture: ComponentFixture<GlobalAnswerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAnswerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
