import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { StorageService } from '../../storage.service';
import { InputDecorator } from '@angular/core/src/metadata/directives';
import { Task } from '../../model/task';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

@Component({
  selector: 'app-task-attachment',
  templateUrl: './task-attachment.component.html',
  styleUrls: ['./task-attachment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskAttachmentComponent implements OnInit {

  constructor(public storage: StorageService, public dialog: MatDialog) {

  }

  @Input() task$: Task;
  @Input() taskID$: String;

  ngOnInit() {

  }

  getDownloadURL(): String[] {

    if (this.task$.attachment_URL == null) {
      return [];
    }

    let r: String[] = Object.values(this.task$.attachment_URL);
    //console.log(r);
    return r;
  }

  onImgClick(url: string) {
    let self = this;

    let dialogRef = this.dialog.open(ImageDialogComponent, {
      maxHeight: '100%',
      panelClass: 'image-dialog',
      data: { img_selected: url, img_array: self.getDownloadURL() }
    });
  }


  onInputFileChange() {
    let files: FileList = (<HTMLInputElement>document.getElementById('inputFile')).files;

    // for(let i = 0; i < files.length; i++){
    //   console.log(files[i]);
    // }

    this.storage.uploadAttachment(this.taskID$, this.task$, files);


  }


}
