import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {ApiUrlInterceptor} from "./interceptor/api-url.interceptor";
import {AuthenticationService} from "./service/authentication.service";

function checkAuthentication(authService: AuthenticationService): () => Observable<any> {
  return () => authService.checkAuthentication().pipe(catchError((err) => of(null)));
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule // to automatically enable CSRF protection https://angular.io/api/common/http/HttpClientXsrfModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: checkAuthentication,
      deps: [AuthenticationService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true }, // We need the interceptor because angular does not add the CSRF token for absolute URLs in HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
