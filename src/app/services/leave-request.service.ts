import { Injectable } from '@angular/core';
import { RestfulService } from "../core/http/restful.service";
import { HttpClient } from "@angular/common/http";
import { ApiEndPointEnum } from "../enums/api-endpiont.enum";

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService extends RestfulService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.LEAVE_REQUEST;
  }

}
