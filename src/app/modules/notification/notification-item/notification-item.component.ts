import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  notification: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.currentMessage$.subscribe(message => {
      if (!message) return;
      this.notification = message.notification;
      console.log(message);
    });
  }

}
