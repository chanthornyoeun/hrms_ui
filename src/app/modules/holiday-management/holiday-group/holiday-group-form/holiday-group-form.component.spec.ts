import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayGroupFormComponent } from './holiday-group-form.component';

describe('HolidayGroupFormComponent', () => {
  let component: HolidayGroupFormComponent;
  let fixture: ComponentFixture<HolidayGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
