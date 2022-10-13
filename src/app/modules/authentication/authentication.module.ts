import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialCompModule } from 'src/app/shared/material-comp/material-comp.module';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialCompModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
