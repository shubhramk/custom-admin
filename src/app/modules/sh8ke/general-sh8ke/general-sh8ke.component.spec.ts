import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSh8keComponent } from './general-sh8ke.component';

describe('GeneralSh8keComponent', () => {
  let component: GeneralSh8keComponent;
  let fixture: ComponentFixture<GeneralSh8keComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSh8keComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSh8keComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
