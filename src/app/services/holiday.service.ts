import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class HolidayService extends RestfulService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.HOLIDAY;
  }

  announcement(payload: any): Observable<ResponseDTO> {
    const formData: FormData = new FormData();
    formData.set('fileUpload', payload['fileUpload']);
    formData.set('text', payload['text']);
    formData.set('telegram', payload['telegram']);
    formData.set('email', payload['email']);
    formData.set('app', payload['app']);

    return this.http.post<ResponseDTO>(ApiEndPointEnum.ANNOUNCEMENT, formData);
  }

}
