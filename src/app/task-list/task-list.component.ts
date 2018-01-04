import { Component, OnInit, Inject, ViewEncapsulation, Output, EventEmitter, ViewChild, SimpleChanges, Input, SimpleChange } from '@angular/core';

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
    public dialog: MatDialog, public fs: FilterService) {

    var self = this;
    fs.changeEmitted$.subscribe(
      text => {
        if(text === "isFilterActive"){
          self.initializeTaskList();
        }
      });
  }

  @Input() isFilterActive$: Boolean = this.fs.isFilterActive$;

  taskList$: Observable<Task[]>;
  taskList$_status_0: Observable<Task[]>;
  taskList$_status_1: Observable<Task[]>;
  taskList$_status_2: Observable<Task[]>;
  taskList$_status_3: Observable<Task[]>;

  ngOnInit() {
    this.initializeTaskList();
  }

  ngOnChanges(changes: SimpleChanges) {
    const isFilterActive$: SimpleChange = changes.isFilterActive$;
    console.log('prev value: ', isFilterActive$.previousValue);
    console.log('got name: ', isFilterActive$.currentValue);
    //this._name = name.currentValue.toUpperCase();
  }

  initializeTaskList() {

    this.taskList$ = this.ds.getTasks();

    this.taskList$_status_0 = this.getFilteredTaskList("status_0");
    this.taskList$_status_1 = this.getFilteredTaskList("status_1");
    this.taskList$_status_2 = this.getFilteredTaskList("status_2");
    this.taskList$_status_3 = this.getFilteredTaskList("status_3");
  }

  getFilteredTaskList(statusId: string): Observable<Task[]> {

    let returnTaskList = this.taskList$.map(tasks => tasks.filter(task => (<Task>task).status === statusId));

    if(this.fs.isFilterActive$){
      if(this.fs.filterBusinessUnit$ != null){
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => (<Task>task).business_unit === this.fs.filterBusinessUnit$));
        console.log('business_unit');
      }
      if(this.fs.filterDepartment$ != null){
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => (<Task>task).business_unit === this.fs.filterDepartment$));
        console.log('department');
      }
      if(this.fs.filterPriority$ != null){
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => (<Task>task).business_unit === this.fs.filterPriority$));
        console.log('priority');
      }
      if(this.fs.filterTitle$ != null){
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => (<Task>task).business_unit.indexOf(this.fs.filterTitle$.toString()) >= 0));
        console.log('title');
      }
    }

    returnTaskList = returnTaskList.map((tasksSorted) => {
      tasksSorted.sort((a: Task, b: Task) => {
        return a.priority < b.priority ? -1 : 1;
      });
      return tasksSorted;
    });

    return returnTaskList;
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

  onHamburgerClick() {
    this.ns.emitChange('toggle');
  }
}