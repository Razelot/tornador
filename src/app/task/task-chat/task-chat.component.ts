import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { DataService } from '../../data.service';
import { AuthService } from '../../auth.service';

import { Observable } from 'rxjs/Observable';

import { Post } from '../../model/post';


@Component({
  selector: 'app-task-chat',
  templateUrl: './task-chat.component.html',
  styleUrls: ['./task-chat.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TaskChatComponent implements OnInit {

  chat$: Observable<any>;
  draftMessage$: String;

  @Input() taskID$;
  

  constructor(public authService: AuthService, private ds: DataService) {
  }

  ngOnInit() {
    this.chat$ = this.ds.getChat(this.taskID$);
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    // const m: String = this.draftMessage$;
    // m.author = this.currentUser;
    // m.thread = this.currentThread;
    // m.isRead = true;
    // this.messagesService.addMessage(m);
    // this.draftMessage = new Message();

    console.log(this.draftMessage$);
    this.draftMessage$ = "";
  }

}
