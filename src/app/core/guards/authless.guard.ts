import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialService } from '../http/credential.service';

@Injectable({
  providedIn: 'root'
})
export class AuthlessGuard implements CanActivate {

  constructor(
    private credentailService: CredentialService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.credentailService.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
