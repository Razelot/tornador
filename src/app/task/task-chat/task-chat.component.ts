import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';

import { Post } from '../../model/post';


@Component({
  selector: 'app-task-chat',
  templateUrl: './task-chat.component.html',
  styleUrls: ['./task-chat.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TaskChatComponent implements OnInit {

  chat$: Observable<Post[]>;

  @Input() task$;
  

  constructor(private ds: DataService) {
  }

  ngOnInit() {
    this.chat$ = this.ds.getChat(this.task$.key);
    // console.log(this.chat$);
  }

}
