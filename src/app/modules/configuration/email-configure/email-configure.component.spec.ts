import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfigureComponent } from './email-configure.component';

describe('EmailConfigureComponent', () => {
  let component: EmailConfigureComponent;
  let fixture: ComponentFixture<EmailConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
