import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';

import { Task } from './task/task';

@Injectable()
export class DataService {

  constructor(private af: AngularFireDatabase) { }

  createTask(task: Task) {
    this.af.list('tasks').push(task);
  }

  deleteTask(key: String) {
    this.af.object('tasks/' + key).remove();
  }

  getTasks() {
    return this.af.list('tasks').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getTask(taskID) {
    return this.af.object('tasks/' + taskID);
  }

  // getTaskTitle(taskID){
  //   return this.af.object('tasks/' + taskID);
  // }

  getDatabase() {
    return this.af;
  }

  getStatusOptions() {
    return this.af.list('/option-selection/status').valueChanges();
  }

} 