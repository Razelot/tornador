import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { NavigationService } from '../navigation.service';

import { Task } from '../task/task';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  today: String;
  newTask: any = {};

  constructor(private ar: ActivatedRoute, private router: Router, 
    private ds: DataService, private ns: NavigationService) { }

  ngOnInit() {
    this.ns.setTitle("New Task");

    var date = new Date();
    var dd = ("0" + (date.getDate())).slice(-2);
    var mm = ("0" + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    this.today = yyyy + '-' + mm + '-' + dd;

    this.resetTask();

  }

  createTask(task: Task) {
    this.ds.createTask(task);
    this.resetTask();
  }

  resetTask() {

    this.newTask = {};
    this.newTask.date_assigned = this.today;
    this.newTask.date_due = this.today;
    this.newTask.status = "pending";
    
  }

}
