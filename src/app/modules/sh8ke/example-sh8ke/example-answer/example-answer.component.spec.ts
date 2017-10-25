import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleAnswerComponent } from './example-answer.component';

describe('ExampleAnswerComponent', () => {
  let component: ExampleAnswerComponent;
  let fixture: ComponentFixture<ExampleAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
