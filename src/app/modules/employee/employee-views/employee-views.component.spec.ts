import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewsComponent } from './employee-views.component';

describe('EmployeeViewsComponent', () => {
  let component: EmployeeViewsComponent;
  let fixture: ComponentFixture<EmployeeViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
