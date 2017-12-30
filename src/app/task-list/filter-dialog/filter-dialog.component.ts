import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  constructor(private ds: DataService, public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    isFilterActive$;

    businessOptions$;
    departmentOptions$;
    priorityOptions$;

  ngOnInit() {

    this.ds.getDatabase().list('/business_unit/').valueChanges()
      .subscribe(businessOptions => {
        this.businessOptions$ = businessOptions;
        // console.log(this.bu00Options$);
      });

      this.ds.getDatabase().list('/department/').valueChanges()
      .subscribe(departmentOptions => {
        this.departmentOptions$ = departmentOptions;
        // console.log(this.bu00Options$);
      });

    this.ds.getDatabase().list('/option-selection/priority/').valueChanges()
      .subscribe(priorityOptions => {
        this.priorityOptions$ = priorityOptions;
        // console.log(this.statusOptions$);
      });

  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
