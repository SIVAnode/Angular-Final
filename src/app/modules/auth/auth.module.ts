import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersModule } from '../../helpers/helpers.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HelpersModule
  ]
})
export class AuthModule { }