import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { Experience } from '../models/experience';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends RestfulService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.EXPERIENCE;
  }

  batchUpdate(experences: Experience[]): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(this.getUrl(), experences);
  }

}
