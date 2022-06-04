import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFormComponent } from './training-form.component';

describe('ExperienceFormComponent', () => {
  let component: TrainingFormComponent;
  let fixture: ComponentFixture<TrainingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
