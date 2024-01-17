import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowHidePasswordDirective } from '../../directives/show-hide-password.directive';
import { SignInReqI, UserInfoI } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/api-services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ShowHidePasswordDirective]
})
export class SignInComponent implements OnInit {
  authForm! : FormGroup;
  hidePassword = true;
  error$ = new Subject<string | null>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  setTokens( token: string, refreshToken: string) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
  }

  private _onSubmit = () => {
    const reqData: SignInReqI = this.formSignInForm(this.authForm.value);
    console.log(reqData);
    this.authService.signIn(reqData).subscribe(
      (authData: UserInfoI) => {
        this.setTokens(authData.tokens.token, authData.tokens.refreshToken);
        this.userService.setUserData(authData.userInfo);
        this.router.navigate(['/dashboard']);
        this.error$.next(null);
      },
      error => {
        this.error$.next(error);
        console.log(error);
        error.error.errors ? 
          this.notificationService.showNotificationInport(error.error?.errors, 'error')
          :
          this.notificationService.showNotificationInport('Ошибка ' + error.error?.StatusCode, 'error');
      }
    );

  };
  public get onSubmit() {
    return this._onSubmit;
  }
  public set onSubmit(value) {
    this._onSubmit = value;
  }

  formSignInForm = (form: { login: string; password: string}): SignInReqI => ({
    login: form.login,
    password: form.password,
  })

  public onShow = (eve: Event) => {
    eve.stopPropagation();
  }

}
