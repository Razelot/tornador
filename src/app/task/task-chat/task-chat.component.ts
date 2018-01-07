import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { DataService } from '../../data.service';
import { AuthService } from '../../auth.service';

import { Observable } from 'rxjs/Observable';

import { Message } from '../../model/message';


@Component({
  selector: 'app-task-chat',
  templateUrl: './task-chat.component.html',
  styleUrls: ['./task-chat.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TaskChatComponent implements OnInit {

  messages$: Observable<any>;
  draftMessage$: String;

  @Input() taskID$;
  

  constructor(private authService: AuthService, private ds: DataService) {
  }

  ngOnInit() {
    this.messages$ = this.ds.getMessages(this.taskID$);
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    var newMessage$: Message = <Message>{};

    newMessage$.text = this.draftMessage$;

    newMessage$.timestamp = new Date();

    var self = this;

    this.authService.user.subscribe(user => {

      newMessage$.sender = user.email;

      console.log(newMessage$);

      self.ds.sendMessage(self.taskID$, newMessage$);

    });

    this.draftMessage$ = "";
  }
  

}
