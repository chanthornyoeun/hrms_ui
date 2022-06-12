import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from 'src/app/models/response-dto';

export interface IRequestOptions {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
      [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable()
export abstract class RestfulService {

  protected constructor(protected http: HttpClient) { }

  abstract getUrl(): string;

  list(options?: IRequestOptions): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(this.getUrl(), options);
  }

  get(id: number, options?: IRequestOptions): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(`${this.getUrl()}/${id}`, options);
  }

  save(payload: any, options?: IRequestOptions): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.getUrl(), payload, options);
  }

  update(id: number, payload: any, options?: IRequestOptions): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(`${this.getUrl()}/${id}`, payload, options);
  }

  delete(id: number, options?: IRequestOptions): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(`${this.getUrl()}/${id}`, options);
  }

}
