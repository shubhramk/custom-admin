import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStaticsComponent } from './general-statics.component';

describe('GeneralStaticsComponent', () => {
  let component: GeneralStaticsComponent;
  let fixture: ComponentFixture<GeneralStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
