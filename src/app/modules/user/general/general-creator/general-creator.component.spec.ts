import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCreatorComponent } from './general-creator.component';

describe('GeneralCreatorComponent', () => {
  let component: GeneralCreatorComponent;
  let fixture: ComponentFixture<GeneralCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
