import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {

  constructor() { }

  isFilterActive$: Boolean = false;
  filterBusinessUnit$: String;
  filterDepartment$: String;
  filterPriority$: String;
  filterTitle$: String;

}
