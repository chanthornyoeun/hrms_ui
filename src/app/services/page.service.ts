import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';
import { ParamsBuilder } from '../utilities/params-builder';

@Injectable({
  providedIn: 'root'
})
export class PageService extends RestfulService {


  getUrl(): string {
    return ApiEndPointEnum.PAGE;
  }

  getPagesAsTree(): Observable<ResponseDTO> {
    const params: HttpParams = ParamsBuilder.build({ showAsTree: true });
    return this.http.get<ResponseDTO>(ApiEndPointEnum.PAGE, { params });
  }

}
