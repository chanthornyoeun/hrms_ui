import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_PROVIDER } from './config';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTOR_PROVIDER } from "./core/interceptors/http-interceptor-provider";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    MAT_FORM_FIELD_PROVIDER,
    HTTP_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
