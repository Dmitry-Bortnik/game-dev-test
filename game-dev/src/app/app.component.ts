import { Component } from '@angular/core';
import { NotificationService, Notification, NotificationType } from '../services/notification.service';
import { NotificationTooltipComponent } from './components/notification-tooltip/notification-tooltip.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'game-dev';

  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService
  ) {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }
}
