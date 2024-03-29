import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyContactFormComponent } from './emergency-contact-form.component';

describe('EmergencyContactComponent', () => {
  let component: EmergencyContactFormComponent;
  let fixture: ComponentFixture<EmergencyContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
