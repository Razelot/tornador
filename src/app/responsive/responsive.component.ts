import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { MatSidenav, MatSidenavContainer } from '@angular/material';
import { Router } from '@angular/router';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-responsive',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent implements OnInit {

  @ViewChild('sidenav') private sidenav$: MatSidenav;
  @ViewChild('task') private task$: TaskComponent;
  
  constructor(private navigationService: NavigationService, private router: Router) { 

    this.navigationService.changeEmitted$.subscribe(event =>{

      if((<string[]>event)[0] == 'task-card'){

        let taskId = (<string[]>event)[1];

        this.sidenav$.open();
        this.task$.setTaskById(taskId);
      }
    });
  
  }


  ngOnInit() {

    //STUPID CODE DOESN'T WORK, WE'RE SWITCHING 'OVER'.

    // if(window.innerWidth >= 900){
    //   this.sidenav$.mode = 'side';
    // } else{
    //   this.sidenav$.mode = 'over';
    // }

    // window.addEventListener('resize', () => {
    //   if(window.innerWidth > 420 && window.innerWidth < 900){
    //       this.sidenav$.mode = 'over';
    //   } 
    //   else if(window.innerWidth >= 900)
    //   {
    //       this.sidenav$.mode = 'side';
    //   }
    // });

  }



  onBackdropClick(){
    this.hideTaskDetail();
    this.hideBackdrop();
  }

  onHideButtonClick(){
    this.sidenav$.close();
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

}
