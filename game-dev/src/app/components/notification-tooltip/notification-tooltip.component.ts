import { Component, Input, OnInit } from '@angular/core';
import { NotificationService, Notification, NotificationType } from 'src/app/services/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification-tooltip',
  templateUrl: './notification-tooltip.component.html',
  styleUrls: ['./notification-tooltip.component.scss'],
  animations: [
    trigger('itemAnime', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'translateY(140px)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        animate('50ms', style({
          height: '*',  
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        animate(200)
      ]),
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68',
          opacity: 0,
        })),
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }))
      ])
    ]),
  ],
})
export class NotificationTooltipComponent {

  @Input() notifications: Notification[] = []

  constructor(
    private notificationService: NotificationService,
  ) { }

  removeNotification(index: number): void {
    this.notificationService.removeNotification(this.notifications[index]);
  }

}
