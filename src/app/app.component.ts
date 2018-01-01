import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { DataService } from './data.service';
import { NavigationService } from './navigation.service';

import { ActivatedRoute } from "@angular/router";
import { Department } from './model/department';
import { BusinessUnit } from './model/businessUnit';
import { Priority } from './model/priority';
import { Status } from './model/status';

// import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // title = 'TORNADOR';


  constructor(private ds: DataService, private ns: NavigationService) {
  }

  ngOnInit() {

    this.ns.setTitle("HEELLLO");

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


}
