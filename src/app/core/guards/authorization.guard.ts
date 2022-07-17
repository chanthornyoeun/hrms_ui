import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PageService } from 'src/app/services/page.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private pageService: PageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url: string = state.url.split('/')[1];
    const isAuthorized: boolean = this.pageService.hasPermission(url);
    console.log(isAuthorized);
    if (!isAuthorized) {
      this.router.navigate(['/unauthorized']);
    }
    return isAuthorized;
  }

}
