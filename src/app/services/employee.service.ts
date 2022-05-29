import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from "../models/response-dto";
import { Observable } from "rxjs";
import { ParamsBuilder } from '../utilities/params-builder';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends RestfulService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.EMPLOYEE;
  }

  getCurrentEmployee(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CURRENT_USER, {});
  }

  getLeaveSummary(leaveTypeId: number, employeeId: number): Observable<ResponseDTO> {
    const params: HttpParams = ParamsBuilder.build({leaveTypeId, employeeId});
    return this.http.get<ResponseDTO>(ApiEndPointEnum.LEAVE_SUMMARY, {params});
  }

}
