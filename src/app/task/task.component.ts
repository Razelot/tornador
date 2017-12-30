import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { TaskOverviewComponent } from './task-overview/task-overview.component';
import { Task } from '../model/task';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskComponent implements OnInit {

  taskID: string;
  task$: Observable<{}>;

  constructor(private ar: ActivatedRoute, private ds: DataService, private router: Router,
              public snackBar : MatSnackBar ) { }

  ngOnInit() {

    var self = this;
    this.taskID = this.ar.snapshot.params.taskID;

    // this.ds.getTask(this.taskID).subscribe(t => {
    //   this.task$ = t;
    //   console.log(this.task$);
    // });

    this.task$ = this.ds.getTask(this.taskID);


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

  
  activeTab: number = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  onSwipe(action: String) {
    // next
    if (action === this.SWIPE_ACTION.RIGHT) {
      if (this.activeTab > 0) {
        this.activeTab = this.activeTab - 1;
      } 
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
      if (this.activeTab < 4) {
        this.activeTab = this.activeTab + 1;
      } 
    }

  }

  onSaveButtonClick(task: Task) : void {
    this.ds.updateTask(this.taskID, task);
    this.snackBar.open("Task Saved!", "Dismiss", {
      duration: 3000,
    });
  }
}