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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // title = 'TORNADOR';

  constructor(private ds: DataService, private ns: NavigationService, private r: Router, public snackBar: MatSnackBar) {

    var self = this;
    ns.changeEmitted$.subscribe(
      text => {

        console.log(text);

        if (text == 'openDrawer') {
          self.openDrawer();
        } else if (text == 'closeDrawer') {
          self.closeDrawer();
        }
      });
  }

  ngOnInit() {

    this.ns.setTitle("TORNADOR");

    this.ds.getDatabase().list('/business_unit/').snapshotChanges()
      .subscribe(array => {
        this.ds.setBusinessUnitArray(
          array.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        )
      });

    this.ds.getDatabase().list('/department/').snapshotChanges()
      .subscribe(array => {
        this.ds.setDepartmentArray(
          array.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        )
      });

    this.ds.getDatabase().list('/option-selection/priority/').snapshotChanges()
      .subscribe(array => {
        this.ds.setPriorityArray(
          array.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        )
      });

    this.ds.getDatabase().list('/option-selection/status/').snapshotChanges()
      .subscribe(array => {
        this.ds.setStatusArray(
          array.map(m => ({ key: m.payload.key, ...m.payload.val() }))
        )
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
