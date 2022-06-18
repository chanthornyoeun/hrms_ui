import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../models/response-dto';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { Observable } from 'rxjs';
import { EmailConfigure } from '../models/email-configure';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendMail(payload: { to: string, text: string }): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.EMAIL_TESTER, payload);
  }

  loadConfig(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.EMAIL_CONFIGURE);
  }

  updateConfig(config: EmailConfigure): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(ApiEndPointEnum.EMAIL_CONFIGURE, config);
  }

}
