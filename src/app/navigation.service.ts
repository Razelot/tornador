import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class NavigationService {
  

  taskID: String;

  task$: Observable<{}>;

  foo: Observable<{}>;


  title :String;
  isTask : boolean = false;
  isEdit : boolean = false;

  constructor() { }

  setTitle(title :String){
    this.title = title;
  }

  getTitle(){
    return this.title;
  }

  getTask(){
    return this.isTask;
  }
  
  setTask(bool :boolean, taskID :String){
    this.isTask = bool;
    this.taskID = taskID;
  }


}