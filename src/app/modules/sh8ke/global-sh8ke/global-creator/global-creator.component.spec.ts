import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCreatorComponent } from './global-creator.component';

describe('GlobalCreatorComponent', () => {
  let component: GlobalCreatorComponent;
  let fixture: ComponentFixture<GlobalCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
