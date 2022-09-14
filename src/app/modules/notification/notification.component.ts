import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, shareReplay, finalize, switchMap, Subject, takeUntil } from 'rxjs';
import { Credential, CredentialService } from 'src/app/core/http/credential.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  width: string = '';
  filterCtl: FormControl = new FormControl('All');
  options: string[] = ['All', 'Read', 'Unread'];
  contents: any[] = [];
  offset: number = 0;
  limit: number = 20;
  total: number = 0;
  isLoading: boolean = false;
  currentUser: Credential;
  badgeCount$!: Observable<number>;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService,
    private credentialService: CredentialService,
    private router: Router,
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) {
    this.currentUser = this.credentialService.getCredential();
  }

  ngOnInit(): void {
    this.getWidth();
    this.getNotifications(this.getParams());
    this.clearBadgeCount();
    this.badgeCount$ = this.notificationService.currentMessage$.pipe(
      switchMap(_ => this.notificationService.badgeCount$),
      map(res => res.notificationBadge)
    );
    this.handleForceRefresh();
  }

  private handleForceRefresh() {
    this.notificationService.forceRefresh$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this.refresh());
  }

  getWidth() {
    this.isHandset$.subscribe(isHandset => this.width = isHandset ? '100vw' : '680px');
  }

  filterChanged(option: string) {
    if (this.filterCtl.value === option) return;
    this.filterCtl.setValue(option);
    this.contents = [];
    this.resetPagination();
    this.getNotifications(this.getParams());
  }

  getNotifications(params: HttpParams = new HttpParams(), options?: { clearContent: boolean }) {
    this.loaderService.show();
    this.notificationService.getNotifications(params)
      .pipe(
        map(res => {
          this.offset = this.offset + this.limit;
          this.total = res.total;
          return res.data;
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe(contents => {
        if (options && options.clearContent) {
          this.contents = contents;
        } else {
          this.contents.push(...contents);
        }
        this.cd.markForCheck();
      });
  }

  private getParams(): HttpParams {
    let params: HttpParams = ParamsBuilder.build({ offset: this.offset, limit: this.limit, type: 'LEAVE_REQUEST' });
    const option = this.filterCtl.value;
    if (option === 'Unread') {
      params = params.set('isRead', false);
    } else if (option === 'Read') {
      params = params.set('isRead', true);
    }
    return params;
  }

  onScrollDown() {
    this.getNotifications(this.getParams());
  }

  private resetPagination(): void {
    this.offset = 0;
    this.total = 0;
    this.limit = 20;
  }

  viewLeaveDetails(content: any): void {
    this.markAsRead(content);
    let url: string = '/employee-leave/view';
    if (content.data.data.body.employee.id === this.currentUser.employeeId) {
      url = '/leave-request/view';
    }
    this.router.navigate([url, content.data.data.body.id]);
  }

  markAsRead(content: any): void {
    this.notificationService.markAsRead(content.id).subscribe(res => {
      content.isRead = true;
    });
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe(_ => this.refresh());
  }

  markAsUnread(content: any): void {
    this.notificationService.markAsUnread(content.id).subscribe(res => {
      content.isRead = false;
    });
  }

  markAllAsUnread() {
    this.notificationService.markAllAsUnread().subscribe(_ => this.refresh());
  }

  removeNotification(content: any, index: number): void {
    this.notificationService.removeNotification(content.id).subscribe(res => {
      this.contents.splice(index, 1);
    });
  }

  clearAllNotifications() {
    this.notificationService.removeAllNotifications().subscribe(_ => this.contents = []);
  }

  clearBadgeCount() {
    this.notificationService.clearBadgeCount().subscribe(_ => {
      this.notificationService.broadcastBadgeCount(0);
    });
  }


  refreshNewContents() {
    this.clearBadgeCount();
    this.refresh();
  }

  private refresh() {
    this.resetPagination();
    this.getNotifications(this.getParams(), { clearContent: true });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
