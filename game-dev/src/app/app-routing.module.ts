import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main-container/pages/dashboard/dashboard.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginGuard } from 'src/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
