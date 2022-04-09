import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCalendarFormComponent } from './working-calendar-form.component';

describe('WorkingCalendarFormComponent', () => {
  let component: WorkingCalendarFormComponent;
  let fixture: ComponentFixture<WorkingCalendarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingCalendarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingCalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
