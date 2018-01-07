import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  constructor() { }

  isFilterActive$: Boolean = false;
  filterBusinessUnit$: String[];
  filterDepartment$: String[];
  filterPriority$: String[];
  filterTitle$: String;


  isAllFilterPropertyNull(): boolean {
    let r = (
      this.filterBusinessUnit$ == null &&
      this.filterDepartment$ == null &&
      this.filterPriority$ == null &&
      this.filterTitle$ == null
    );

    return r;
  }

  setAllFilterPropertyNull() {
    this.filterBusinessUnit$ = null;
    this.filterDepartment$ = null;
    this.filterPriority$ = null;
    this.filterTitle$ = null;
    this.emitChange('filterProperty');
  }
}
