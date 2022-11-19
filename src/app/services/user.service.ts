import { Injectable } from '@angular/core';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestfulService {

  getUrl(): string {
    return ApiEndPointEnum.USER;
  }

  updateDeviceToken(token: string): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(ApiEndPointEnum.DEVICE_TOKEN, { deviceToken: token });
  }

  resetPassword(payload: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.RESET_PASSWORD, payload);
  }

}
