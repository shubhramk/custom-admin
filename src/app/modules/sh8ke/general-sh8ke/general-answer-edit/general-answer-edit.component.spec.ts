import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAnswerEditComponent } from './general-answer-edit.component';

describe('GeneralAnswerEditComponent', () => {
  let component: GeneralAnswerEditComponent;
  let fixture: ComponentFixture<GeneralAnswerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAnswerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
