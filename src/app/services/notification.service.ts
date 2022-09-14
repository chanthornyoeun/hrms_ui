import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { ApiEndPointEnum } from '../enums/api-endpiont.enum';
import { ResponseDTO } from '../models/response-dto';
import { ParamsBuilder } from '../utilities/params-builder';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private message$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentMessage$: Observable<any> = this.message$.asObservable();
  private _badgeCount$: BehaviorSubject<{ notificationBadge: number }> = new BehaviorSubject<{ notificationBadge: number }>({ notificationBadge: 0 });
  badgeCount$: Observable<{ notificationBadge: number }> = this._badgeCount$.asObservable();

  private _forceRefresh$: Subject<void> = new Subject<void>();
  forceRefresh$: Observable<void> = this._forceRefresh$.asObservable();

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient
  ) {
    this.currentMessage$.pipe(
      switchMap((res) => this.getBadgeCount())
    ).subscribe(res => {
      this.broadcastBadgeCount(res.data.notificationBadge);
    });
  }

  getNotifications(params: HttpParams = new HttpParams()): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.NOTIFICATION, { params });
  }

  getUnreadNotifications(): Observable<ResponseDTO> {
    return this.getNotifications(ParamsBuilder.build({ isRead: false, type: 'LEAVE_REQUEST' }));
  }

  getBadgeCount(): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(ApiEndPointEnum.NOTIFICATION_BADGE_COUNT);
  }

  clearBadgeCount(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.CLEAR_BADGE_COUNT, {});
  }

  markAsRead(notificationId: number): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.MARK_AS_READ, {}, { params: ParamsBuilder.build({ 'ids': notificationId }) });
  }

  markAllAsRead(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.MARK_ALL_AS_READ, {});
  }

  markAsUnread(notificationId: number): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.MARK_AS_UNREAD, {}, { params: ParamsBuilder.build({ 'ids': notificationId }) });
  }

  markAllAsUnread(): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(ApiEndPointEnum.MARK_ALL_AS_UNREAD, {});
  }

  removeNotification(notificationId: number): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(ApiEndPointEnum.NOTIFICATION, { params: ParamsBuilder.build({ 'ids': notificationId }) });
  }

  removeAllNotifications(): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(ApiEndPointEnum.REMOVE_ALL_NOTIFICATION);
  }

  broadcastBadgeCount(notificationBadge: number): void {
    this._badgeCount$.next({ notificationBadge });
  }

  getToken(): Observable<string | null> {
    return this.angularFireMessaging.getToken;
  }

  /**
   * Request permission
   */
  requestToken(): Observable<string | null> {
    return this.angularFireMessaging.requestToken;
  }

  /**
   * Dispatch message to observable
   */
  receiveMessage(): void {
    this.angularFireMessaging.messages.subscribe(message => this.message$.next(message));
  }

  doRefresh(): void {
    this._forceRefresh$.next();
  }

}
