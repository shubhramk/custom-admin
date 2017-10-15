import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenralSh8keEditComponent } from './genral-sh8ke-edit.component';

describe('GenralSh8keEditComponent', () => {
  let component: GenralSh8keEditComponent;
  let fixture: ComponentFixture<GenralSh8keEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenralSh8keEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenralSh8keEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
