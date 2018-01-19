import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterService } from '../filter.service';
import { DataService } from '../data.service';

import { NavigationService } from '../navigation.service';
import { MatSidenav, MatSidenavContainer, MatDrawer, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { FilterDialogComponent } from '../task-list/filter-dialog/filter-dialog.component';


import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent implements OnInit {

  @ViewChild('drawerNav') private drawerNav$: MatSidenav;
  @ViewChild('taskNav') private taskNav$: MatSidenav;
  @ViewChild('task') private taskComponent$: TaskComponent;

  constructor(private ar: ActivatedRoute, public navService: NavigationService, private ds: DataService,
    private router: Router, private location: Location, public fs: FilterService,
    private snackBar: MatSnackBar, private dialog: MatDialog) {

    this.navService.setTitle("All Tasks");

    this.navService.changeEmitted$.subscribe(event => {

      if ((<string[]>event)[0] == 'task-card') {

        let taskID = (<string[]>event)[1];
        this.location.replaceState("/tasks/" + taskID);

        this.taskNav$.open();
        this.taskComponent$.setTaskById(taskID);
      }
    });

  }

  ngOnInit() {

    if (this.ar.snapshot.params.taskID) {
      let taskID = this.ar.snapshot.params.taskID;
      this.taskNav$.open();
      this.taskComponent$.setTaskById(taskID);
    }

    //STUPID CODE DOESN'T WORK, WE'RE SWITCHING 'OVER'.

    // if(window.innerWidth >= 900){
    //   this.taskNav$.mode = 'side';
    // } else{
    //   this.taskNav$.mode = 'over';
    // }

    // window.addEventListener('resize', () => {
    //   if(window.innerWidth > 420 && window.innerWidth < 900){
    //       this.taskNav$.mode = 'over';
    //   } 
    //   else if(window.innerWidth >= 900)
    //   {
    //       this.taskNav$.mode = 'side';
    //   }
    // });

  }

  onHamburgerClick() {
    console.log('hamburgerClick');
  }

  onSaveButtonClick() {
    this.ds.updateTask(this.navService.taskID$, this.navService.task$);

    this.snackBar.open("Task Saved!", "Dismiss", {
      duration: 3000,
    });
  }

  deleteTask() {
    console.log('deleteTask');
  }

  onBackdropClick() {
    this.navService.setTitle("All Tasks");
    this.location.replaceState("/tasks");
    this.navService.clearTask();

    // this.hideTaskDetail();
    // this.hideBackdrop();
  }

  onHideButtonClick() {
    this.taskNav$.close();
  }

  hideBackdrop() {
    document.getElementById("backdrop").style.display = "none";
  }

  showBackdrop() {
    document.getElementById("backdrop").style.display = "block";
  }

  hideTaskDetail() {
    document.getElementById("task-detail").style.display = "none";
  }

  showTaskDetail() {
    document.getElementById("task-detail").style.display = "block";
  }

  openFilterDialog(): void {
    let dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: '100%',
      panelClass: 'filter-dialog', backdropClass: 'transparent-backdrop',
    });

    // dialogRef.componentInstance.isFilterActive$ = this.isFilterActive$;
    //dialogRef.componentInstance.size = "Large";

    dialogRef.afterClosed().subscribe(result => {
      if (this.fs.isFilterActive$) {
        if (this.fs.isAllFilterPropertyNull()) {
          this.fs.isFilterActive$ = false;
        }
      } else { // if isFilterActive$ == false
        this.fs.setAllFilterPropertyNull();
      }

    });
  }
}
