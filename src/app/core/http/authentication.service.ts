import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CredentialService } from './credential.service';
import { Router } from '@angular/router';
import { ApiEndPointEnum } from 'src/app/enums/api-endpiont.enum';
import { ResponseDTO } from 'src/app/models/response-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private credentialService: CredentialService
  ) { }

  login(credential: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.LOGIN, credential)
      .pipe(
        tap(res =>
          this.credentialService.setCredential({ id: res['data'].id, username: res.data.username, token: res.data.token, employeeId: res.data.employeeId })
        )
      )
  }

  logout(): void {
    this.http.post(ApiEndPointEnum.LOGOUT, {}).subscribe(_ => {
      this.credentialService.removeCredential();
      this.router.navigate(['/auth/login']);
    });
  }

}
