import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class NavigationService {

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }


  taskID: String;

  task$: Observable<{}>;

  foo: Observable<{}>;


  title: String;
  constructor() { }

  setTitle(title: String) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  toQueryParamsObject(str) {
    return JSON.parse('{"' + str.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  }

}