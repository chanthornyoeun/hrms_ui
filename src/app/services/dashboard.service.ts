import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getData(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.DASHBOARD_CARD);
  }

}
