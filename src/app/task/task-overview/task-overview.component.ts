import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormControl, Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

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

  formGroup$: FormGroup;

  constructor(private ar: ActivatedRoute, private ds: DataService, private router: Router, formBuilder: FormBuilder) {
    this.formGroup$ = formBuilder.group({
      floatLabel: 'never',
      business_unit: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

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

  @Output() onCreateClickEvent = new EventEmitter();
  @Output() onCancelClickEvent = new EventEmitter();

  onCreateClick(){

    if(this.formGroup$.value['title'] == null ||
    this.formGroup$.value['business_unit'] == null ||
    this.formGroup$.value['department'] == null ||
    this.formGroup$.value['priority'] == null )
    {
      //do nothing, because there are null at requried fields
    }
    else
    {
      this.onCreateClickEvent.emit();
    }

  }
  onCancelClick(){
    this.onCancelClickEvent.emit();
  }

}
