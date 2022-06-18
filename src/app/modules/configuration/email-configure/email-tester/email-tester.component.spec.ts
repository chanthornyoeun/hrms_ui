import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTesterComponent } from './email-tester.component';

describe('EmailTesterComponent', () => {
  let component: EmailTesterComponent;
  let fixture: ComponentFixture<EmailTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailTesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
