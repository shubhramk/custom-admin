import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleSh8keComponent } from './example-sh8ke.component';

describe('ExampleSh8keComponent', () => {
  let component: ExampleSh8keComponent;
  let fixture: ComponentFixture<ExampleSh8keComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleSh8keComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleSh8keComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
