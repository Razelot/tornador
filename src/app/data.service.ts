import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';

import { Task } from './task/task';



@Injectable()
export class DataService {

  itemsRef: AngularFireList<any>;

  constructor(private af: AngularFireDatabase) { }

  addTask(task: Task) {
    console.log(task);
  }

  getTasks() {
    return this.af.list('tasks').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getTask(taskID) {
    return this.af.object('tasks/' + taskID).valueChanges();
  }

  getDatabase() {
    return this.af;
  }

  getStatusOptions(){
    return this.af.list('/option-selection/status').valueChanges();
  }

} 