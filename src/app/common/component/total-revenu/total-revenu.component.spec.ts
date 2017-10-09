import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRevenuComponent } from './total-revenu.component';

describe('TotalRevenuComponent', () => {
  let component: TotalRevenuComponent;
  let fixture: ComponentFixture<TotalRevenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalRevenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRevenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
