import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  private loginStateSubject = new Subject<any>();
  private loginState;

  constructor() {
    const self=this;
    if (firebase.apps.length==0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        self.loginState=true;
        self.loginStateSubject.next(true);
        localStorage.setItem('email',user.email);
      } else {
        self.loginState=false;
        self.loginStateSubject.next(false);
        localStorage.setItem('email',null);
      }
    });
  }
  setLoginState(isLoggedIn) {
    this.loginStateSubject.next(isLoggedIn);
  }
  getLoginState(): Observable<any> {
    return this.loginStateSubject.asObservable();
  }
  getLoginStatus(){
    return this.loginState;
  }
}
