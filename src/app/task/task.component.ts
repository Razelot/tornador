import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { TaskOverviewComponent } from './task-overview/task-overview.component';
import { Task } from '../model/task';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../data.service';
import { NavigationService } from '../navigation.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  encapsulation: ViewEncapsulation.None, 
})
export class TaskComponent implements OnInit {

  taskID$: string;
  task$: Observable<{}>;

  constructor(private ar: ActivatedRoute, private ds: DataService, private ns: NavigationService, private router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.taskID$ = this.ar.snapshot.params.taskID;
    this.task$ = this.ds.getTask(this.taskID$);

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

  onSaveButtonClick(task: Task): void {

    this.ds.updateTask(this.taskID$, task);
    this.snackBar.open("Task Saved!", "Dismiss", {
      duration: 3000,
    });
  }

  onBackButtonClick(){
    this.router.navigate(['/tasks']);
  }

  deleteTask(){
    this.ds.deleteTask(this.taskID$);
    this.onBackButtonClick();
  }

}