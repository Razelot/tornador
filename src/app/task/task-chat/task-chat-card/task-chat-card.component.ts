import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Message } from '../../../model/message';


@Component({
  selector: 'app-task-chat-card',
  templateUrl: './task-chat-card.component.html',
  styleUrls: ['./task-chat-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskChatCardComponent implements OnInit {

  @Input() message$;

  constructor() { }

  ngOnInit() {
  }

}
