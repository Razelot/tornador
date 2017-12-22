import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

// import { Task } from '../task/task';

import { DataService } from '../data.service';
import { NavigationService } from '../navigation.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Observable<any[]>;

  constructor(private ar: ActivatedRoute, private router: Router, 
    private ds: DataService, private ns: NavigationService) { }

  ngOnInit() {
    this.tasks = this.ds.getTasks();

    this.ns.setTitle("Task List");
  }

  deleteTask(key: String) {
    this.ds.deleteTask(key);
  }

}
