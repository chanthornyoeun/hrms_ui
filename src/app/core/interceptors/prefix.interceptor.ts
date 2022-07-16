import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PrefixInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers: HttpHeaders = request.headers.set('X-API-KEY', environment.X_API_KEY);
    const req = request.clone({
      url: `${environment.API_URL}${request.url}`,
      headers
    });
    return next.handle(req);
  }

}
