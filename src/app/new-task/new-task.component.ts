import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

import { Task } from '../model/task';
import { TaskOverviewComponent } from '../task/task-overview/task-overview.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  today: String;
  newTask: any = {};

  constructor(private ds: DataService,
    public dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    
    var date = new Date();
    var dd = ("0" + (date.getDate())).slice(-2);
    var mm = ("0" + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    this.today = yyyy + '-' + mm + '-' + dd;

    this.resetTask();

  }

@ViewChild('taskOverview') taskOverview : TaskOverviewComponent;

  createTask(task: Task) {

console.log(this.taskOverview.formGroup$);

    if
    (
      this.taskOverview.formGroup$.value['title'] == null ||
      this.taskOverview.formGroup$.value['business_unit'] == null ||
      this.taskOverview.formGroup$.value['department'] == null ||
      this.taskOverview.formGroup$.value['priority'] == null )
    { 
      // has error
    } else{
      this.ds.createTask(task);
      this.resetTask();
      this.onNoClick();
    }

  }

  resetTask() {
    this.newTask = {};
    this.newTask.date_assigned = this.today;
    this.newTask.date_due = this.today;
    this.newTask.status = "status_0";
    this.newTask.description = "";
  }

  separatorKeysCodes = [ENTER, COMMA];

  fruits = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];


  addTag(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
