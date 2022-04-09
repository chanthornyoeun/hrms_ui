import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayGroupListComponent } from './holiday-group-list.component';

describe('HolidayGroupListComponent', () => {
  let component: HolidayGroupListComponent;
  let fixture: ComponentFixture<HolidayGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidayGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
