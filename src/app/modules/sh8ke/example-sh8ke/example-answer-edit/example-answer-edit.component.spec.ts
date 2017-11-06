import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleAnswerEditComponent } from './example-answer-edit.component';

describe('ExampleAnswerEditComponent', () => {
  let component: ExampleAnswerEditComponent;
  let fixture: ComponentFixture<ExampleAnswerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleAnswerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
