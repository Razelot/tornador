import { Component, ViewChild } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { DataService } from './data.service';
import { NavigationService } from './navigation.service';

import { Router, ActivatedRoute } from "@angular/router";
import { Department } from './model/department';
import { BusinessUnit } from './model/businessUnit';
import { Priority } from './model/priority';
import { Status } from './model/status';
import { MatDrawer } from '@angular/material';

import { MatSnackBar } from '@angular/material';

import { Task } from './model/task';
import { AuthService } from './auth.service';
import { UserSetting } from './model/user-setting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // title = 'TORNADOR';


  // @ViewChild('drawer') drawer$: MatDrawer;


  constructor(private ds: DataService, private ns: NavigationService, private r: Router, public snackBar: MatSnackBar, public authService: AuthService) {
    // ns.changeEmitted$.subscribe(
    //   text => {
    //     if (text == 'openDrawer') {
    //       this.openDrawer();
    //     } else if (text == 'closeDrawer') {
    //       this.closeDrawer();
    //     }
    //   });
  }

  ngOnInit() {

    this.ns.setTitle("TORNADOR");

    this.ds.loadData();

    let userSubscription = this.authService.getUser().take(1)
      .subscribe(user => {
        this.ds.loadUserData(user);
        userSubscription.unsubscribe();
      });
      
    
  }

  getTitle() {
    this.ns.getTitle();
  }

  // openDrawer() {
  //   this.drawer$.open();
  // }

  // closeDrawer() {
  //   this.drawer$.close();
  // }

}