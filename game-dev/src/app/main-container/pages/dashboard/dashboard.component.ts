import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationTooltipComponent } from 'src/app/components/notification-tooltip/notification-tooltip.component';
import { UserInfoI, UserSingleI } from 'src/interfaces/auth.interface';
import { NotificationService, Notification, NotificationType } from 'src/services/notification.service';
import { UserService } from 'src/services/user.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [ ReactiveFormsModule ]
})
export class DashboardComponent implements OnInit {
  testForm! : FormGroup;
  notifications: Notification[] = [];
  userData: UserSingleI | undefined;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  ngOnInit(): void {
    this.testForm = this.fb.group({
      message: [null, [Validators.required]],
    });
    this.userData = this.userService.getUserData();
  }

  public onSubmitMessage() {
    if (this.testForm.value.message)
      this.notificationService.showNotificationInport(this.testForm.value.message, 'warning')
    else 
      this.notificationService.showNotificationInport('Поле пустое', 'error')
  }

  showNotification(message: string, type: any): void {
    this.notificationService.showNotificationInport(message, type)
  }
}
