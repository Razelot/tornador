import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';

import { Task } from './model/task';
import { Message } from './model/message';

import { Observable } from 'rxjs/Observable';
import { Department } from './model/department';
import { resolve } from 'q';
import { Subscription } from 'rxjs/Subscription';
import { BusinessUnit } from './model/businessUnit';
import { Priority } from './model/priority';
import { Status } from './model/status';

@Injectable()
export class DataService {

  businessUnitArray$: Array<BusinessUnit> = [];
  departmentArray$: Array<Department> = [];
  priorityArray$: Array<Priority> = [];
  statusArray$: Array<Status> = [];

  constructor(private af: AngularFireDatabase) { }

  createTask(task: Task) {
    this.af.list('tasks').push(task);
  }

  updateTask(taskID: String, task: Task) {
    if(task.description == null){
      task.description = "";
    }
    this.af.object('/tasks/' + taskID).update(task);
  }

  deleteTask(key: String) {
    this.af.object('tasks/' + key).remove();
  }

  getTasks(): Observable<Task[]>{
    return this.af.list('tasks').snapshotChanges().map(changes => {
      return changes.map(c => <Task>({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getTask(taskID): Observable<Task> {
    return this.af.object('tasks/' + taskID).valueChanges().map(task => <Task>task);
  }

  // getTaskTitle(taskID){
  //   return this.af.object('tasks/' + taskID);
  // }

  getDatabase() {
    return this.af;
  }

  getBusinessUnitArray() : Array<BusinessUnit>{
    return this.businessUnitArray$;    
  }
  
  getDepartmentArray() : Array<Department>{
    return this.departmentArray$;    
  }
  
  getPriorityArray() : Array<Priority>{
    return this.priorityArray$;    
  }

  getStatusArray() : Array<Status>{
    return this.statusArray$;    
  }

  setBusinessUnitArray(array : Array<BusinessUnit>) {
    this.businessUnitArray$ = array;    
  }
  
  setDepartmentArray(array : Array<Department>) {
    this.departmentArray$ = array;    
  }
  
  setPriorityArray(array : Array<Priority>) {
    this.priorityArray$ = array;    
  }

  setStatusArray(array : Array<Status>) {
    this.statusArray$ = array;    
  }

  
  getDepartment(id : string): Department{
    return this.getDepartmentArray().find(obj => obj.id === id);
  }
  
  getBusinessUnit(id : string): BusinessUnit{
    return this.getBusinessUnitArray().find(obj => obj.id === id);
  }

  getPriority(id : string): Priority{
    return this.getPriorityArray().find(obj => obj.id === id);
  }

  getStatus(id : string) : Status{
    return this.getStatusArray().find(obj => obj.id === id);
  }

  getMessages(taskID : string): Observable<Message[]>{
    return this.af.list('tasks/' + taskID + '/chat').valueChanges()
    .map(message => (<Message[]>message));
  }

  sendMessage(taskID : string, message : Message) {
    this.af.list('tasks/' + taskID + '/chat').push(message);
  }

} 