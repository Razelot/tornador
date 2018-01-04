import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../data.service';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  constructor(private ds: DataService, public dialogRef: MatDialogRef<FilterDialogComponent>, public fs: FilterService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

    businessOptions$;
    departmentOptions$;
    priorityOptions$;

  ngOnInit() {

    this.businessOptions$ = this.ds.getBusinessUnitArray();
    this.departmentOptions$ = this.ds.getDepartmentArray();
    this.priorityOptions$ = this.ds.getPriorityArray();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
