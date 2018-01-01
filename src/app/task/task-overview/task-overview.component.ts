import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css', '../../task/task.component.css']
})
export class TaskOverviewComponent implements OnInit {

  @Input() task$;
  @Input() isAddNewTask$: boolean = false;

  businessOptions$;
  departmentOptions$;
  
  statusOptions$;
  priorityOptions$

  constructor(private ar: ActivatedRoute, private ds: DataService, private router: Router, private app : AppComponent ) { }

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

      this.ds.getDatabase().list('/option-selection/status/').valueChanges()
      .subscribe(statusOptions => {
        this.statusOptions$ = statusOptions;
        // console.log(this.statusOptions$);
      });

  }


  setStatusIcon(selectedItem) {

    var icon_string = "&#xE835;";

    switch (selectedItem) {
      case "Not Started":
        icon_string = "&#xE835;"
        break;
      case "In Progress":
        icon_string = "&#xE6C4;"
        break;
      case "Pending":
        icon_string = "&#xE034;"
        break;
      case "Completed":
        icon_string = "&#xE834;"
        break;
    }

    document.getElementById("icon-status").innerHTML = icon_string;

  }


}
