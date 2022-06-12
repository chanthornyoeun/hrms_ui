import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map, shareReplay } from "rxjs/operators";
import { Observable } from "rxjs";
import { CredentialService } from "../../http/credential.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../http/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private credentialService: CredentialService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  goToProfile() {
    this.router.navigate(['employees/update', this.credentialService.getCredential().employeeId]);
  }

  logout() {
    this.authService.logout();
  }

}
