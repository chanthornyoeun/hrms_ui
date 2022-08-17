import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, filter} from 'rxjs/operators';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { CredentialService } from '../http/credential.service';
import {StatusCodeEnum} from "../status-code.enum";

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private credentialService: CredentialService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private alertMessage(message: string) {
    this.messageService.show(message);
  }

  private handleError(evt: HttpErrorResponse) {
    let message = '';
    switch (evt.status) {
      case StatusCodeEnum.UNAUTHORIZED:
        this.handleUnauthorized()
        message = evt.error.message;
        break;
      case StatusCodeEnum.FORBIDDEN:
      case StatusCodeEnum.BAD_REQUEST:
      case StatusCodeEnum.NOT_FOUND:
      case StatusCodeEnum.INTERNAL_SERVER_ERROR:
        message = evt.error.message;
        break;
    }
    this.alertMessage(message);
    return throwError(evt);
  }

  private handleUnauthorized() {
    this.router.navigate(['/auth/login'], {queryParams: {redirect: location.pathname}, replaceUrl: true});
    this.credentialService.removeCredential();
  }

}
