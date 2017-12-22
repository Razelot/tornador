import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../data.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskID: string;
  task$;
  statusOptions$;

  constructor(private ar: ActivatedRoute, private router: Router,
    private ds: DataService, private ns: NavigationService) { }

  ngOnInit() {

    var self = this;
    this.taskID = this.ar.snapshot.params.taskID;

    // this.ds.getTask(this.taskID).subscribe(t => {
    //   this.task$ = t;
    //   console.log(this.task$);
    // });

    this.task$ = this.ds.getTask(this.taskID).valueChanges();

    this.task$.subscribe(changes => {
      self.ns.setTitle(changes.title);
    });

    this.ds.getDatabase().list('/option-selection/status/').valueChanges()
      .subscribe(statusOptions => {
        this.statusOptions$ = statusOptions;
        console.log(this.statusOptions$);
      });

    // Check if character exists in database
    // this.task.subscribe(snapshot => {
    //   if (snapshot.val() != null) {
    //     console.log('task exists');
    //   } else {
    //     console.log('task does not exist');
    //     this.router.navigate(['']); // Redeirect to index
    //   }
    // });

  }


  setStatusIcon(selectedItem) {

    var icon_string = "&#xE835;";

    switch (selectedItem) {
      case "Not Started":
        icon_string = "&#xE835;"
        break;
      case "In Progress":
        icon_string = "&#xE6C4;"
        break;
      case "Pending":
        icon_string = "&#xE034;"
        break;
      case "Completed":
        icon_string = "&#xE834;"
        break;
    }

    document.getElementById("icon-status").innerHTML = icon_string;

  }

  goBack() {
    console.log("goBack clicked");
    window.history.back();
  }

}