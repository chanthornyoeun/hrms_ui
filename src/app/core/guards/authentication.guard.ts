import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialService } from '../http/credential.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private credentialService: CredentialService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated: boolean = this.credentialService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    }
    return isAuthenticated;
  }

}
