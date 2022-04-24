import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ParamsBuilder } from '../utilities/params-builder';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService extends RestfulService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.LEAVE_TYPE;
  }

  getActiveLeaveTypes() {
    const params: HttpParams = ParamsBuilder.build({isActive: true});
    return this.list({params});
  }

}
