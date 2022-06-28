import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private message$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentMessage$: Observable<any> = this.message$.asObservable();

  constructor(private angularFireMessaging: AngularFireMessaging) { }

  getToken(): Promise<string | null | undefined> {
    return this.angularFireMessaging.getToken.toPromise();
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(token => {
      // TODO: update device's token
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(message => this.message$.next(message));
  }

}
