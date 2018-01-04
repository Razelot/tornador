import { Component, OnInit, Inject, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { Task } from '../model/task';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { FormControl } from '@angular/forms';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { DataService } from '../data.service';
import { NavigationService } from '../navigation.service';
import { FilterService } from './filter-dialog/filter.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TaskListComponent implements OnInit {

  disableSelect = new FormControl(false);
  toppings = new FormControl();
  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private ar: ActivatedRoute, private ds: DataService, private ns: NavigationService, private router: Router,
    public dialog: MatDialog, public fs : FilterService) { }

    ngOnInit() {
    }

  openNewTaskDialog(): void {
    let dialogRef = this.dialog.open(NewTaskComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  openFilterDialog(): void {
    let dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: '100%',
      panelClass: 'filter-dialog', backdropClass: 'transparent-backdrop',
    });

    // dialogRef.componentInstance.isFilterActive$ = this.isFilterActive$;
    //dialogRef.componentInstance.size = "Large";

    dialogRef.afterOpen().subscribe(result => {
      //  console.log('result', result);
    });
  }

<<<<<<< HEAD

  ngOnInit() {
    
=======
  deleteTask(key: String) {
    this.ds.deleteTask(key);
>>>>>>> 5a61d256c7d396389b3d45683f2fb4f7b02b6997
  }

  activeTab$: number = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  onSwipe(action: String) {
    // next
    if (action === this.SWIPE_ACTION.RIGHT) {
      if (this.activeTab$ > 0) {
        this.activeTab$ = this.activeTab$ - 1;
      }
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
      if (this.activeTab$ < 3) {
        this.activeTab$ = this.activeTab$ + 1;
      }
    }

  }

  toolbarTitle$: string = "Task > Not Started";
  setToolbarTitle() {
    switch (this.activeTab$) {
      case 0:
        this.toolbarTitle$ = "Task > Not Started";
      case 1:
        this.toolbarTitle$ = "Task > In Progress";
      case 2:
        this.toolbarTitle$ = "Task > Completed";
      case 3:
        this.toolbarTitle$ = "Task > Pending";
    }
  }

  onHamburgerClick(){
    this.ns.emitChange('toggle');
  }
}