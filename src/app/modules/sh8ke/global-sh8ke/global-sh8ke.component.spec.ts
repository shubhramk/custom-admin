import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSh8keComponent } from './global-sh8ke.component';

describe('GlobalSh8keComponent', () => {
  let component: GlobalSh8keComponent;
  let fixture: ComponentFixture<GlobalSh8keComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSh8keComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSh8keComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
