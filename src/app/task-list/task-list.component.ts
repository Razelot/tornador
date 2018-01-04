import { Component, OnInit, Inject, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

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


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TaskListComponent implements OnInit {

  isFilterDivVisible$: boolean = false;

  isFilterActive$: boolean = false;

  disableSelect = new FormControl(false);

  toppings = new FormControl();

  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private ar: ActivatedRoute, private ds: DataService, private ns: NavigationService, private router: Router,
    public dialog: MatDialog) { }

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
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }


  ngOnInit() {
    this.ns.setTask(false, null);
  }

  deleteTask(key: String) {
    this.ds.deleteTask(key);
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

  
  @Output() hamburgerClickEvent = new EventEmitter();
  onHamburgerClick(){
    this.hamburgerClickEvent.emit();
  }
}