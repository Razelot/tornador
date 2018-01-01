import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Task } from '../../model/task';
import { BusinessUnit } from '../../model/businessUnit';
import { Department } from '../../model/department';
import { Priority } from '../../model/priority';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCardComponent implements OnInit {

  constructor(private ds: DataService, private router: Router, private app : AppComponent) { }

  @Input() filterProperty$: string;
  @Input() filterString$: string;

  labelColor$: string = "#369742";

  //FILTER_PROPERTY = { status: 'status', priority: 'priority' };

  tasks$: Observable<Task[]>;
  bu00Array$;
  deptArray$: Array<Department>;
  priorityArray$

  ngOnInit() {

    if (this.filterProperty$ != null && this.filterString$ != null) {
      this.tasks$ = this.getFilteredTasks(this.filterProperty$, this.filterString$);
    }
    else {
      this.tasks$ = this.ds.getTasks();
    }

    // this.tasks$ = this.tasks$.map((tasksSorted) => {
    //   console.log(tasksSorted);
    //   return tasksSorted;
    // });

    this.tasks$ = this.tasks$.map((tasksSorted) => {
      tasksSorted.sort((a: Task, b: Task) => {

        // let aPriority = this.getPriorityOrder(a.priority);
        // let bPriority = this.getPriorityOrder(b.priority);

        return a.priority < b.priority ? -1 : 1;

      });
      return tasksSorted;
    });

    this.ds.getDatabase().list('/business_unit/').valueChanges()
      .subscribe(businessOptions => {
        this.bu00Array$ = businessOptions.map(b => <BusinessUnit>b);;
      });

    this.ds.getDatabase().list('/department/').valueChanges()
      .subscribe(departmentOptions => {
        this.deptArray$ = departmentOptions.map(d => <Department>d);;
      });

    this.ds.getDatabase().list('/option-selection/priority/').valueChanges()
      .subscribe(priorityOptions => {
        this.priorityArray$ = priorityOptions.map(p => <Priority>p);;
      });
  }

  getPriorityOrder(priorityName: string) {
    switch (priorityName) {
      case "Now":
        return 0;
      case "Today":
        return 1;
      case "This Week":
        return 2;
      case "This Month":
        return 3;
      case "This Year":
        return 4;
    }
  }

  getFilteredTasks(filterProperty: string, filterString: string): Observable<Task[]> {

    if (filterProperty == "status") {
      return this.ds.getTasks()
        .map(tasks => tasks.filter(task => (<Task>task).status === filterString));
    }
    else if (filterProperty == "priority") {
      return this.ds.getTasks()
        .map(tasks => tasks.filter(task => (<Task>task).priority === filterString));
    }
  }

  routerLink(taskID: string) {
    this.router.navigate(["/tasks/" + taskID]);
  }

  getChipColor(task: Task, property: String): string {
    if (property == "bu00") {
      let bu00: BusinessUnit = this.bu00Array$.find(b => b.id === (<Task>task).business_unit);
      if (bu00 == null) return "#363636";
      return bu00.color;
    }
    else if (property == "department") {
      let dept: Department = this.deptArray$.find(d => d.name === (<Task>task).department);
      if (dept == null) return "#363636";
      return dept.color;
    }
    else if (property == "priority") {
      let priority: Priority = this.priorityArray$.find(p => p.name === (<Task>task).priority);
      if (priority == null) return "#363636";
      return priority.color;
    }
    else {
      return "#363636";
    }
  }

}
