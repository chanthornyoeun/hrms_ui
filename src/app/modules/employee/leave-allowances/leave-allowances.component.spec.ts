import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAllowancesComponent } from './leave-allowances.component';

describe('LeaveAllowancesComponent', () => {
  let component: LeaveAllowancesComponent;
  let fixture: ComponentFixture<LeaveAllowancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveAllowancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
