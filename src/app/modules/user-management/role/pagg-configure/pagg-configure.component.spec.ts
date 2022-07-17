import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaggConfigureComponent } from './pagg-configure.component';

describe('PaggConfigureComponent', () => {
  let component: PaggConfigureComponent;
  let fixture: ComponentFixture<PaggConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaggConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaggConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
