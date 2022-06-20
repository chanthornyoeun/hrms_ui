import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnDestroy {

  private subject: Subject<void> = new Subject<void>();

  isHandset: boolean = false;
  isSmall: boolean = false;
  isLarge: boolean = false;

  constructor(private breakpoints: BreakpointObserver) {
    this.breakpoints.observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Large])
      .pipe(takeUntil(this.subject))
      .subscribe(match => {
        this.resetState();
        if (match.breakpoints[Breakpoints.Handset] || match.breakpoints[Breakpoints.Small]) {
          this.isHandset = match.matches;
        }
        if (match.breakpoints[Breakpoints.XSmall]) {
          this.isSmall = match.matches;
        }
        if (match.breakpoints[Breakpoints.Large]) {
          this.isLarge = match.matches;
        }
      });
  }

  private resetState() {
    this.isHandset = false;
    this.isSmall = false;
    this.isLarge = false;
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

}
