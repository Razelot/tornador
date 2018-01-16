import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { MatSidenav, MatSidenavContainer, MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent implements OnInit {

  @ViewChild('drawerNav') private drawerNav$: MatSidenav;
  @ViewChild('taskNav') private taskNav$: MatSidenav;
  @ViewChild('task') private task$: TaskComponent;
  
  constructor(private navService: NavigationService, private router: Router) { 

    // navService.changeEmitted$.subscribe(
    //   text => {
    //     if (text == 'openDrawer') {
    //       this.drawerNav$.open();
    //     } else if (text == 'closeDrawer') {
    //       this.drawerNav$.close();
    //     }
    //   });

    this.navService.changeEmitted$.subscribe(event =>{

      if((<string[]>event)[0] == 'task-card'){

        let taskId = (<string[]>event)[1];

        this.taskNav$.open();
        this.task$.setTaskById(taskId);
      }
    });
  
  }


  ngOnInit() {

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

  onHamburgerClick(){
    console.log('hamburgerClick');
  }

  onSaveButtonClick(taskId: string){
    console.log('saveButtonClick');
  }

  deleteTask(){
    console.log('deleteTask');
  }


  onBackdropClick(){
    this.hideTaskDetail();
    this.hideBackdrop();
  }

  onHideButtonClick(){
    this.taskNav$.close();
  }

  hideBackdrop(){
    document.getElementById("backdrop").style.display = "none";
  }

  showBackdrop(){
    document.getElementById("backdrop").style.display = "block";
  }

  hideTaskDetail(){
    document.getElementById("task-detail").style.display = "none";
  }

  showTaskDetail(){
    document.getElementById("task-detail").style.display = "block";
  }




  openDrawer() {
    this.drawerNav$.open();
  }

  closeDrawer() {
    this.drawerNav$.close();
  }

}
