import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Task } from '../task/task';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  newTask: any = {};

  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  addTask(task: Task) {
    this.ds.addTask(task);
    this.newTask = {};
  }

}
