import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { TaskOverviewComponent } from './task-overview/task-overview.component';
import { Task } from '../model/task';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../data.service';
import { NavigationService } from '../navigation.service';

import { Location } from '@angular/common';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskComponent implements OnInit {

  @Input() taskID$: string;
  task$: Observable<Task>;
  task$Object: Task;

  activeTab$: number = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  prevListStatus$: string;

  constructor(private ar: ActivatedRoute, private ds: DataService, private ns: NavigationService, private router: Router,
    public snackBar: MatSnackBar, private location: Location) { }

  ngOnInit() {

    let self = this;

    this.taskID$ = this.ar.snapshot.params.taskID;
    this.task$ = this.ds.getTask(this.taskID$).take(1)
    .do(task => {
      self.prevListStatus$ = task.status;
      self.task$Object = task;
    });

    if (this.ar.snapshot.params.tab) {
      this.activeTab$ = this.getTabID(
        this.ns.camelize(this.ar.snapshot.params.tab));
    }
  }

  setTaskById(taskId: string){
    
    let self = this;
    this.taskID$ = taskId;

    this.task$ = this.ds.getTask(this.taskID$).take(1)
    .do(task => {
      self.task$Object = task;
    });
  }

  getAttachmentsLength(): string{
    let r = "";

    if(this.task$Object.attachment_URL != null){
      r =  Object.values(this.task$Object.attachment_URL).length.toString();
    }

    return r;
  }

  getCommentsLength(): string {
    let r = "";
    
    if(this.task$Object.chat != null){
      r =  Object.values(this.task$Object.chat).length.toString();
    }

    return r;
  }

  onSwipe(action: String) {
    // next
    if (action === this.SWIPE_ACTION.RIGHT) {
      if (this.activeTab$ > 0) {
        this.activeTab$ = this.activeTab$ - 1;
      }
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
      if (this.activeTab$ < 4) {
        this.activeTab$ = this.activeTab$ + 1;
      }
    }
  }

  onSaveButtonClick(task: Task): void {

    this.ds.updateTask(this.taskID$, task);
    this.snackBar.open("Task Saved!", "Dismiss", {
      duration: 3000,
    });
  }

  onBackButtonClick() {
    this.router.navigate(['/tasks'], { queryParams: { status: this.getStatusByID(this.prevListStatus$) } });
  }

  deleteTask() {
    this.ds.deleteTask(this.taskID$);
    //this.onBackButtonClick();
  }

  getTabID(tab: string) {
    switch (tab) {
      case "chat":
        return 1;
      case "attachments":
        return 2;
      case "history":
        return 3;
      default:
        return 0;
    }
  }

  selectedTabChange() {
    switch (this.activeTab$) {
      case 0:
        this.location.replaceState("/tasks/" + this.taskID$);
        break;
      case 1:
        this.location.replaceState("/tasks/" + this.taskID$ + "/chat");
        break;
      case 2:
        this.location.replaceState("/tasks/" + this.taskID$ + "/attachments");
        break;
      case 3:
        this.location.replaceState("/tasks/" + this.taskID$ + "/history");
        break;
      default:
        this.location.replaceState("/tasks/" + this.taskID$);
    }
  }

  getStatusByID(statusID: string) {
    switch (statusID) {
      case "status_0":
        return 'notStarted'
      case "status_1":
        return 'inProgress'
      case "status_2":
        return 'completed'
      case "status_3":
        return 'pending'
      default:
        return null;
    }
  }

}