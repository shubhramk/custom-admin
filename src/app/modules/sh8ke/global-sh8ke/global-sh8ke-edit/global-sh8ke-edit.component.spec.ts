import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSh8keEditComponent } from './global-sh8ke-edit.component';

describe('GlobalSh8keEditComponent', () => {
  let component: GlobalSh8keEditComponent;
  let fixture: ComponentFixture<GlobalSh8keEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSh8keEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSh8keEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
