import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private message$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentMessage$: Observable<any> = this.message$.asObservable();

  constructor(
    private angularFireMessaging: AngularFireMessaging
  ) { }

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

}
