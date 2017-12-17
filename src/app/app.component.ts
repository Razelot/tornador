import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { DataService } from './data.service';
import { AuthService } from './auth.service';


import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email: string;
  password: string;

  title = 'TORNADOR';
  user: Observable<firebase.User>;

  tasks: Observable<any[]>;

  constructor(public authService: AuthService, private dataService: DataService) {
    // this.user = this.afAuth.authState;
  }

  ngOnInit() {
    this.tasks = this.dataService.getTasks();
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.authService.logout();
  }
}
