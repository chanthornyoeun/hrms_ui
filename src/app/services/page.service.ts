import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';
import { ParamsBuilder } from '../utilities/params-builder';

export interface PagePermissionPayload {
  roleId: number;
  pages: number[];
}

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

  getPageByCurrentUser(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.CURRENT_USER_PAGE);
  }

  getPageByRole(roleId: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.ROLE_PAGE, { params: ParamsBuilder.build({ roleId }) });
  }

  applyPage(payload: PagePermissionPayload): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(ApiEndPointEnum.ROLE_PAGE, payload);
  }

}
