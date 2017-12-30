import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';

import { Task } from './task/task';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private af: AngularFireDatabase) { }

  createTask(task: Task) {
    this.af.list('tasks').push(task);
  }

updateTask(taskID: String, task: Task){
  this.af.object('/tasks/' + taskID).update(task);
}

  deleteTask(key: String) {
    this.af.object('tasks/' + key).remove();
  }

  getTasks() {
    return this.af.list('tasks').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ... c.payload.val() }));
    });
  }

  getTask(taskID) : Observable<{}>{
    return this.af.object('tasks/' + taskID).valueChanges();
  }

  getDatabase() {
    return this.af;
  }

} 