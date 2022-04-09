import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCalendarListComponent } from './working-calendar-list.component';

describe('WorkingCalendarListComponent', () => {
  let component: WorkingCalendarListComponent;
  let fixture: ComponentFixture<WorkingCalendarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingCalendarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
