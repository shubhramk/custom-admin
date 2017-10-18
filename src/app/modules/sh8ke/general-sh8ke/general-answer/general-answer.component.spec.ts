import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAnswerComponent } from './general-answer.component';

describe('GeneralAnswerComponent', () => {
  let component: GeneralAnswerComponent;
  let fixture: ComponentFixture<GeneralAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
