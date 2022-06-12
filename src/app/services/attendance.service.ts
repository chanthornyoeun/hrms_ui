import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ResponseDTO} from "../models/response-dto";
import {ApiEndPointEnum} from "../enums/api-endpiont.enum";
import {Observable} from "rxjs";
import {IRequestOptions} from "../core/http/restful.service";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  list(option?: IRequestOptions): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.ATTENDANCE, option);
  }

  checkIn(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CHECK_IN, {});
  }

  checkOut(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CHECK_OUT, {});
  }

}
