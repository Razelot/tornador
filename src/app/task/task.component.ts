import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { TaskOverviewComponent } from './task-overview/task-overview.component';
import { Task } from '../model/task';
import { MatSnackBar } from '@angular/material';

import { DataService } from '../data.service';

import { Location } from '@angular/common';
import { NavigationService } from '../navigation.service';


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

  constructor(private navService: NavigationService, private ar: ActivatedRoute, private ds: DataService, private router: Router,
    public snackBar: MatSnackBar, private location: Location) { }

  ngOnInit() {
    if (this.ar.snapshot.params.taskID != null) {
      this.setTaskById(this.ar.snapshot.params.taskID);
    }
  }

  setTaskById(taskID: string) {
    this.taskID$ = taskID;

    this.task$ = this.ds.getTask(this.taskID$).take(1)
      .do(task => {
        this.navService.setTaskID(this.taskID$);
        this.navService.setTitle(task.title);
        this.navService.setTask(task);

        this.prevListStatus$ = task.status;
        this.task$Object = task;
      });

    this.activeTab$ = 0;

    if (this.ar.snapshot.params.tab) {
      this.activeTab$ = this.getTabID(
        this.navService.camelize(this.ar.snapshot.params.tab));
    }
  }

  getAttachmentsLength(): string {
    let r = "";

    if (this.task$Object.attachment_URL != null) {
      r = Object.values(this.task$Object.attachment_URL).length.toString();
    }

    return r;
  }

  getCommentsLength(): string {
    let r = "";

    if (this.task$Object.chat != null) {
      r = Object.values(this.task$Object.chat).length.toString();
    }

    return r;
  }

  onSwipe(event) {
    console.log(event)

    // console.log("SWIPE")

    // next
    if (event.type === this.SWIPE_ACTION.RIGHT) {
      if (this.activeTab$ > 0) {
        this.activeTab$ = this.activeTab$ - 1;
      }
    }

    // previous
    if (event.type === this.SWIPE_ACTION.LEFT) {
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