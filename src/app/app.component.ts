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

  constructor(private ds: DataService, private ns: NavigationService, private r: Router, public snackBar: MatSnackBar, public authService: AuthService) {

    var self = this;
    ns.changeEmitted$.subscribe(
      text => {
        if (text == 'openDrawer') {
          self.openDrawer();
        } else if (text == 'closeDrawer') {
          self.closeDrawer();
        }
      });
  }

  ngOnInit() {

    this.ns.setTitle("TORNADOR");

    let userSubscription = this.authService.getUser().take(1)
      .subscribe(user => {

        let userSettingSubscription = this.ds.getUserSetting(user.uid).subscribe(userSetting => {
          this.authService.userSetting$ = (<UserSetting>userSetting);

          let businessUnitSubscription = this.ds.getDatabase().list('/business_unit/').snapshotChanges()
            .subscribe(changes => {
              let array: Array<BusinessUnit> = changes.map(m => ({ key: m.payload.key, ...m.payload.val() }));
              let filter = (<UserSetting>userSetting).business_units;
              let filteredArray: Array<BusinessUnit> = array.filter(f => filter.indexOf(f.id) >= 0);
              this.ds.setBusinessUnitArray(filteredArray);
              
              businessUnitSubscription.unsubscribe();
            });


          let departmentSubscription = this.ds.getDatabase().list('/department/').snapshotChanges()
            .subscribe(changes => {
              let array: Array<Department> = changes.map(m => ({ key: m.payload.key, ...m.payload.val() }));
              let filter = (<UserSetting>userSetting).departments;
              let filteredArray: Array<Department> = array.filter(f => filter.indexOf(f.id) >= 0);
              this.ds.setDepartmentArray(filteredArray);

              departmentSubscription.unsubscribe();
            });

            userSettingSubscription.unsubscribe();
        });

        userSubscription.unsubscribe();
      });


    this.ds.getDatabase().list('/option-selection/priority/').snapshotChanges()
      .subscribe(array => {
        this.ds.setPriorityArray(
          array.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        );
      });

    this.ds.getDatabase().list('/option-selection/status/').snapshotChanges()
      .subscribe(array => {
        this.ds.setStatusArray(
          array.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        );
      });
  }

  getTitle() {
    this.ns.getTitle();
  }

  @ViewChild('drawer') drawer$: MatDrawer;
  openDrawer() {
    this.drawer$.open();
  }

  closeDrawer() {
    this.drawer$.close();
  }

}
