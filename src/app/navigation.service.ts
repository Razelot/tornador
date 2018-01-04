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

}