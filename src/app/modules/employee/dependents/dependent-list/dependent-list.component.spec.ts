import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentListComponent } from './dependent-list.component';

describe('FamilyListComponent', () => {
  let component: DependentListComponent;
  let fixture: ComponentFixture<DependentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
