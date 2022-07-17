import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestfulService } from '../core/http/restful.service';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';
import { ParamsBuilder } from '../utilities/params-builder';
import { Page } from '../models/page';

export interface PagePermissionPayload {
  roleId: number;
  pages: number[];
}

@Injectable({
  providedIn: 'root'
})
export class PageService extends RestfulService {

  pages: Page[] = [];

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

  hasPermission(url: string): boolean {
    const topLevel: boolean = this.pages.some(page => page.url === url);
    let childLevel: boolean = false;
    const pages = this.pages.filter(page => page.children.length > 0);
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const isAccessable = this.checkPermission(page, url);
      if (isAccessable) {
        childLevel = isAccessable;
        break;
      }
    }
    return topLevel || childLevel;
  }

  private checkPermission(page: Page, url: string): boolean {
    return page.children.some(child => child.url === url);
  }

}
