import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { UserSetting } from './model/user-setting';


@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  userSetting$: UserSetting;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  getUser() {
    return this.user;
  }

  signup(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    let self = this;
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebaseAuth
      .auth
      .signOut();
  }

}