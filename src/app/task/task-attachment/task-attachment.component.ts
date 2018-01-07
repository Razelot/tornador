import { Component, OnInit, Input, Inject } from '@angular/core';
import { StorageService } from '../../storage.service';
import { InputDecorator } from '@angular/core/src/metadata/directives';
import { Task } from '../../model/task';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-attachment',
  templateUrl: './task-attachment.component.html',
  styleUrls: ['./task-attachment.component.css']
})
export class TaskAttachmentComponent implements OnInit {

  constructor(public storage: StorageService, public dialog: MatDialog) { }

  @Input() task$: Task;
  URL$: string[] = [];

  ngOnInit() {
    //console.log(this.task$.attachment_URL);

    for(let i = 0, length = this.task$.attachment_URL.length; i < length; i++){
      if(this.task$.attachment_URL[i] != null){
        this.URL$.push(this.task$.attachment_URL[i]);
      }
    }
  }

  onImgClick(url: string){
    let dialogRef = this.dialog.open(ImgDialog, {
      panelClass: 'img-dialog',
      data: { img_src: url }
    });
  }
}

@Component({
  selector: 'img-dialog',
  template: '<img [src]="url$" style="max-height: 100%; max-width: 100%;">',
})
export class ImgDialog {

  constructor(
    public dialogRef: MatDialogRef<ImgDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.url$ = data.img_src;

    }

  url$: string;

  onNoClick(): void {
    this.dialogRef.close();
  }

}
