import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';
import { UserRole } from '../models/user-role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends RestfulService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.ROLE;
  }

  assignRoles(userRole: UserRole): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(ApiEndPointEnum.USER_ROLE, userRole);
  }
  
}
