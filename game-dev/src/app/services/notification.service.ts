import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, take, timer } from 'rxjs';

export enum NotificationType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationSubject.asObservable();
  private timers: Map<string, Subscription> = new Map<string, Subscription>()
  
  showNotification(message: string, type: NotificationType = NotificationType.Info): void {
    const notificationId = this.generateNotificationId();
    const newNotification: Notification = { id: notificationId, message, type,}
    const notifications = [...this.notificationSubject.value, newNotification].slice(-3);
    this,this.notificationSubject.next(notifications);

   //

  const timerSubscription = timer(15000)
    .pipe(take(1))
    .subscribe(() => {
      this.removeNotificationById(notificationId);
    });
   
    this.timers.set(notificationId, timerSubscription);
  }

  showNotificationInport(message: string, type: any): void {
    let nType: NotificationType = NotificationType.Info;
    switch (type) {
      case 'error': 
        nType = NotificationType.Error;
        break;
      case 'warning': 
        nType = NotificationType.Warning;
        break;
      case 'success': 
        nType = NotificationType.Info;
        break;
    }
    this.showNotification(message, nType)
  }

  removeNotification(notification: Notification): void {
    this.removeNotificationById(notification.id);
  }  

  private removeNotificationById( notificationId: string): void {
    const notifications = this.notificationSubject.value.filter((n) => n.id != notificationId);
    this.notificationSubject.next(notifications);
    const timer = this.timers.get(notificationId);
    if (timer) {
      timer.unsubscribe();
      this.timers.delete(notificationId);
    }
    if (notifications.length > 0) {
      this.startTimerForOldestNotificatin();
    }
  }

  private startTimerForOldestNotificatin(): void {
    const oldestNotification = this.notificationSubject.value[this.notificationSubject.value.length - 1];
    const timerSubscription = timer(15000)
      .pipe(take(1))
      .subscribe(() => {
        this.removeNotificationById(oldestNotification.id);
      });

      this.timers.set(oldestNotification.id, timerSubscription);
  }

  private generateNotificationId(): string {
    return Math.random().toString(36).substr(2,9);
  }

}

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}
