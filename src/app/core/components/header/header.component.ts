import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CredentialService } from "../../http/credential.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../http/authentication.service";
import { ResponsiveService } from 'src/app/services/responsive.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  profilePicture: string = '';
  badgeCount$!: Observable<number>;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private credentialService: CredentialService,
    private authService: AuthenticationService,
    public responsive: ResponsiveService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.profilePicture = this.credentialService.getCredential().profile;
    this.notificationService.getBadgeCount().subscribe(res => {
      this.notificationService.broadcastBadgeCount(res.data.notificationBadge);
    });
    this.badgeCount$ = this.notificationService.badgeCount$.pipe(map(res => res.notificationBadge));
  }

  goToProfile() {
    this.router.navigate(['employees/update', this.credentialService.getCredential().employeeId]);
  }

  logout() {
    this.notificationService
      .getToken()
      .pipe(switchMap(token => this.authService.logout(token)))
      .subscribe();
  }

  clearBadgeCount() {
    this.notificationService.clearBadgeCount().subscribe(_ => {
      this.notificationService.broadcastBadgeCount(0);
    });
  }

}
