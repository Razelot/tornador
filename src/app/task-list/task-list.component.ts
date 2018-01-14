import { Component, OnInit, Inject, ViewEncapsulation, Output, EventEmitter, ViewChild, SimpleChanges, Input, SimpleChange } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { AuthService } from '../auth.service';


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

  constructor(private ar: ActivatedRoute, public ds: DataService, private authService: AuthService, private ns: NavigationService, private router: Router,
    public dialog: MatDialog, public fs: FilterService) {

    var self = this;
    fs.changeEmitted$.subscribe(
      text => {
        if (text === "filterProperty") {
          if (this.fs.isFilterActive$) {
            self.initializeTaskList();
          }
        }
        if (text === "filterToggle") {
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

    let taskList = this.ds.getTasks().map(m => m.filter(task => 
      this.ds.userSetting$.business_units.indexOf(task.business_unit) >= 0  && 
      this.ds.userSetting$.departments.indexOf(task.department) >= 0
    ));

    this.taskList$ = taskList;

    this.initializeTaskList();

    if (this.ar.snapshot.queryParams.status) {
      this.activeTab$ = this.getTabID(
        this.ns.camelize(this.ar.snapshot.queryParams.status));
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    const isFilterActive$: SimpleChange = changes.isFilterActive$;
    console.log('prev value: ', isFilterActive$.previousValue);
    console.log('got name: ', isFilterActive$.currentValue);
    //this._name = name.currentValue.toUpperCase();
  }

  initializeTaskList() {
    this.taskList$_status_0 = this.getFilteredTaskList("status_0");
    this.taskList$_status_1 = this.getFilteredTaskList("status_1");
    this.taskList$_status_2 = this.getFilteredTaskList("status_2");
    this.taskList$_status_3 = this.getFilteredTaskList("status_3");
  }

  getFilteredTaskList(statusId: string): Observable<Task[]> {

    let returnTaskList = this.taskList$.map(tasks => tasks.filter(task => (<Task>task).status === statusId));

    if (this.fs.isFilterActive$) {
      if (this.fs.filterBusinessUnit$ != null && this.fs.filterBusinessUnit$.length > 0) {
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => this.fs.filterBusinessUnit$.indexOf((<Task>task).business_unit) >= 0));
      }
      if (this.fs.filterDepartment$ != null && this.fs.filterDepartment$.length > 0) {
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => this.fs.filterDepartment$.indexOf((<Task>task).department) >= 0));
      }
      if (this.fs.filterPriority$ != null && this.fs.filterPriority$.length > 0) {
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => this.fs.filterPriority$.indexOf((<Task>task).priority) >= 0));
      }
      if (this.fs.filterTitle$ != null) {
        returnTaskList = returnTaskList.map(tasks => tasks.filter(task => (<Task>task).title.indexOf(this.fs.filterTitle$.toString()) >= 0));
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

    dialogRef.afterClosed().subscribe(result => {
      if (this.fs.isFilterActive$) {
        if (this.fs.isAllFilterPropertyNull()) {
          this.fs.isFilterActive$ = false;
        }
      } else { // if isFilterActive$ == false
        this.fs.setAllFilterPropertyNull();
      }

    });
  }

  @Input() activeTab$: number = 0;
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

  getToolbarTitle() {
    switch (this.activeTab$) {
      case 0:
        return "Task > Not Started";
      case 1:
        return "Task > In Progress";
      case 2:
        return "Task > Completed";
      case 3:
        return "Task > Pending";
    }
  }

  onHamburgerClick() {
    this.ns.emitChange('openDrawer');
  }

  getTabID(tab: string) {
    switch (tab) {
      case "notStarted":
        return 0;
      case "inProgress":
        return 1;
      case "completed":
        return 2;
      case "pending":
        return 3;
      default:
        return 0;
    }
  }

  selectedTabChange() {
    var queryParams: Params = Object.assign({}, this.ar.snapshot.queryParams);
    switch (this.activeTab$) {
      case 0:
        queryParams['status'] = 'notStarted';
        break;
      case 1:
        queryParams['status'] = 'inProgress';
        break;
      case 2:
        queryParams['status'] = 'completed';
        break;
      case 3:
        queryParams['status'] = 'pending';
        break;
      default:
        queryParams['status'] = null;
    }

    this.router.navigate(['.'], { queryParams: queryParams });
  }

}