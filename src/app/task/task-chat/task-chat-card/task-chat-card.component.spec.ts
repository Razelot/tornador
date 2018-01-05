import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChatCardComponent } from './task-chat-card.component';

describe('TaskChatCardComponent', () => {
  let component: TaskChatCardComponent;
  let fixture: ComponentFixture<TaskChatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskChatCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskChatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
