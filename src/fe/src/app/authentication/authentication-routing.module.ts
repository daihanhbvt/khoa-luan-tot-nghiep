import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: '**'},
  {path: 'login', component: LoginComponent,  },
  {path: 'signup', component: RegisterComponent, },
  {path: 'forgot-password', component: ForgotPasswordComponent, },
  {path: 'reset-password', component: ResetPasswordComponent, },
  {path: 'verify/:code', component: VerifyComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
