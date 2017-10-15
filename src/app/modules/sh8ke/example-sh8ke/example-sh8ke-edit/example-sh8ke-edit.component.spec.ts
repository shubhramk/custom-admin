import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleSh8keEditComponent } from './example-sh8ke-edit.component';

describe('ExampleSh8keEditComponent', () => {
  let component: ExampleSh8keEditComponent;
  let fixture: ComponentFixture<ExampleSh8keEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleSh8keEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleSh8keEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
