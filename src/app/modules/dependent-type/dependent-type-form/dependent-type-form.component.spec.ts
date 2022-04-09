import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentTypeFormComponent } from './dependent-type-form.component';

describe('DependentTypeFormComponent', () => {
  let component: DependentTypeFormComponent;
  let fixture: ComponentFixture<DependentTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
