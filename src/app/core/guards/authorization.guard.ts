import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
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
    let isAuthorized: boolean = false;

    if (this.pageService.pages.length > 0) {
      isAuthorized = this.pageService.hasPermission(url);
      if (!isAuthorized) {
        this.navigateToUnauthorizedPage();
      }
      return isAuthorized;
    }

    return this.pageService.getPageByCurrentUser().pipe(
      tap(res => this.pageService.pages = res.data),
      map(_ => {
        isAuthorized = this.pageService.hasPermission((url));
        if (!isAuthorized) {
          this.navigateToUnauthorizedPage();
        }
        return isAuthorized;
      })
    );
  }

  private navigateToUnauthorizedPage(): void {
    this.router.navigate(['/unauthorized']);
  }

}
