import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  
  title :String;

  constructor() { }

  setTitle(title :String){
    this.title = title;
  }

  // getTitle(){
  //   return this.title;
  // }

  //DELETE THIS STUPID TS

}