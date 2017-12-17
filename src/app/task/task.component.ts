import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskID: string;
  task: Observable<any>;

  constructor(private ar: ActivatedRoute, private ds: DataService, private router: Router) { }

  ngOnInit() {
    this.taskID = this.ar.snapshot.params.taskID;
    this.task = this.ds.getTask(this.taskID);

    console.log(this.task);

    // Check if character exists in database
    // this.task.subscribe(snapshot => {
    //   if (snapshot.val() != null) {
    //     console.log('task exists');
    //   } else {
    //     console.log('task does not exist');
    //     this.router.navigate(['']); // Redeirect to index
    //   }
    // });
  }

}