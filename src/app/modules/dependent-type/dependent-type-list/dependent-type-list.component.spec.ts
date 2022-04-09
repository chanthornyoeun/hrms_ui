import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentTypeListComponent } from './dependent-type-list.component';

describe('DependentTypeListComponent', () => {
  let component: DependentTypeListComponent;
  let fixture: ComponentFixture<DependentTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependentTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
