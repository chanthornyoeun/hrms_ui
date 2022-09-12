import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfigureComponent } from './notification-configure.component';

describe('NotificationConfigureComponent', () => {
  let component: NotificationConfigureComponent;
  let fixture: ComponentFixture<NotificationConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
