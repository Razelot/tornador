import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  
  title :String;
  inTask : boolean = false;

  constructor() { }

  setTitle(title :String){
    this.title = title;
  }

  getTitle(){
    return this.title;
  }

  getTask(){
    return this.inTask;
  }
  
  setTask(bool :boolean){
    this.inTask = bool;
  }


}