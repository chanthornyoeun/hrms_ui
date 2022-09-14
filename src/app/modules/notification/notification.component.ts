import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  styleUrls: ['./notification.component.scss']
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
  limit: number = 100;
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
    private loaderService: LoaderService
  ) {
    this.currentUser = this.credentialService.getCredential();
  }

  ngOnInit(): void {
    this.getWidth();
    const params: HttpParams = ParamsBuilder.build({ offset: this.offset, limit: this.limit, type: 'LEAVE_REQUEST' });
    this.getNotifications(params);
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
    let params: HttpParams = ParamsBuilder.build({ offset: 0, limit: this.limit, type: 'LEAVE_REQUEST' });
    this.contents = [];
    if (option === 'Unread') {
      params = params.set('isRead', false);
    } else if (option === 'Read') {
      params = params.set('isRead', true);
    }
    this.getNotifications(params);
  }

  private getNotifications(params: HttpParams = new HttpParams()) {
    this.notificationService.getNotifications(params)
      .pipe(
        map(res => {
          this.offset = this.offset + this.limit;
          this.total = res.total;
          return res.data;
        }),
        finalize(() => this.isLoading = false))
      .subscribe(data => {
        this.contents.push(...data);
      });
  }

  onScrollDown($event: any) {
    console.log($event);
    const params: HttpParams = ParamsBuilder.build({ offset: this.offset, limit: this.limit, type: 'LEAVE_REQUEST' });
    this.getNotifications(params);
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
    this.notificationService.markAllAsRead().subscribe(_ => {
      this.contents = [];
      const params: HttpParams = ParamsBuilder.build({ offset: 0, limit: this.limit, type: 'LEAVE_REQUEST' });
      this.getNotifications(params);
    });
  }

  markAsUnread(content: any): void {
    this.notificationService.markAsUnread(content.id).subscribe(res => {
      content.isRead = false;
    });
  }

  markAllAsUnread() {
    this.notificationService.markAllAsUnread().subscribe(_ => {
      this.contents = [];
      const params: HttpParams = ParamsBuilder.build({ offset: 0, limit: this.limit, type: 'LEAVE_REQUEST' });
      this.getNotifications(params);
    });
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

  refresh() {
    this.contents = [];
    this.clearBadgeCount();
    const params: HttpParams = ParamsBuilder.build({ offset: 0, limit: this.limit, type: 'LEAVE_REQUEST' });
    this.getNotifications(params);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
