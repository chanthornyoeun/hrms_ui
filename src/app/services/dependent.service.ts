import { Injectable } from '@angular/core';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';

@Injectable({
  providedIn: 'root'
})
export class DependentService extends RestfulService {

  getUrl(): string {
    return ApiEndPointEnum.DEPENDENT;
  }

}
