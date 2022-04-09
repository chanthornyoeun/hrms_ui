import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';

@Injectable({
  providedIn: 'root'
})
export class DependentTypeService extends RestfulService {

  constructor(http: HttpClient) { 
    super(http);
  }

  getUrl(): string {
    return ApiEndPointEnum.DEPENDENT_TYPE;
  }

}
