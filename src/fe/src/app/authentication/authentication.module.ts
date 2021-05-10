import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './register/register.service';
import { VerifyService } from './verify/verify.service';


@NgModule({
  declarations: [LoginComponent, VerifyComponent,RegisterComponent, ForgotPasswordComponent, VerifyComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    MaterialModule
  ],
  providers: [LoginService, RegisterService, VerifyService]
})
export class AuthenticationModule { }
