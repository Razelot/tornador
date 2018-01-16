import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { MatSidenav, MatSidenavContainer, MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { TaskComponent } from '../task/task.component';

import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent implements OnInit {

  @ViewChild('drawerNav') private drawerNav$: MatSidenav;
  @ViewChild('taskNav') private taskNav$: MatSidenav;
  @ViewChild('task') private taskComponent$: TaskComponent;

  constructor(private ar: ActivatedRoute, public navService: NavigationService, private router: Router, private location: Location) {

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

  onSaveButtonClick(taskID: string) {
    console.log('saveButtonClick');
  }

  deleteTask() {
    console.log('deleteTask');
  }

  onBackdropClick() {
    this.navService.setTitle("All Tasks");
    this.location.replaceState("/tasks");
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

}
