import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleStaticsComponent } from './example-statics.component';

describe('ExampleStaticsComponent', () => {
  let component: ExampleStaticsComponent;
  let fixture: ComponentFixture<ExampleStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
