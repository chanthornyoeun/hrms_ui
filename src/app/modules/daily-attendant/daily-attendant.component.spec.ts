import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAttendantComponent } from './daily-attendant.component';

describe('DailyAttendantComponent', () => {
  let component: DailyAttendantComponent;
  let fixture: ComponentFixture<DailyAttendantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyAttendantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyAttendantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
