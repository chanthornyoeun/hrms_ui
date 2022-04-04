import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialService } from '../http/credential.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private credentialService: CredentialService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.credentialService.getCredential()?.token;
    let reqHeaders: HttpHeaders = new HttpHeaders();
    if (token) {
      reqHeaders = request.headers.set('Authorization', `Bearer ${token}`)
    }

    const req = request.clone({ headers: reqHeaders });
    return next.handle(req);
  }

}
