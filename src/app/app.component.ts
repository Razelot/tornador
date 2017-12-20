import { Component } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { DataService } from './data.service';


import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: Observable<firebase.User>;

  title = 'TORNADOR';

  tasks: Observable<any[]>;

  constructor(private dataService: DataService) {
    // this.user = this.afAuth.authState;
  }

  ngOnInit() {
    this.tasks = this.dataService.getTasks();
  }

}
