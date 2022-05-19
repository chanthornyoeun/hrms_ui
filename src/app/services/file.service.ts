import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(file: File, destination?: string): Observable<ResponseDTO> {
    if (!destination) {
      destination = environment.fileDestination;
    }
    const payload = new FormData();
    payload.append('fileUpload', file);
    payload.append('destination', destination);
    return this.http.post<ResponseDTO>(ApiEndPointEnum.FILE_UPLOAD, payload);
  }

}
