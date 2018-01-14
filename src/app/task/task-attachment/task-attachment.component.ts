import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { Component, OnInit, AfterViewInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { StorageService } from '../../storage.service';
import { InputDecorator } from '@angular/core/src/metadata/directives';
import { Task } from '../../model/task';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { Ng2ImgMaxService } from 'ng2-img-max/dist/src/ng2-img-max.service';

@Component({
  selector: 'app-task-attachment',
  templateUrl: './task-attachment.component.html',
  styleUrls: ['./task-attachment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskAttachmentComponent implements OnInit {

  constructor(private ar: ActivatedRoute, public storage: StorageService,
    public dialog: MatDialog, private ng2ImgMax: Ng2ImgMaxService, private location: Location) {

  }

  @Input() task$: Task;
  @Input() taskID$: String;

  imgNum$: number;


  ngOnInit() {

    this.imgNum$ = this.ar.snapshot.params.imgNum;

    if (this.imgNum$ == undefined) { return; }


    var imgURL = this.getDownloadURL()[this.imgNum$ - 1];

    this.onImgClick(imgURL.toString(), this.imgNum$);


  }


  getDownloadURL(): String[] {

    if (this.task$.attachment_URL == null) {
      return [];
    }

    let r: String[] = Object.values(this.task$.attachment_URL);
    //console.log(r);
    return r;
  }

  onImgClick(imgURL: string, imgNum: number) {

    setTimeout(() => {
      let dialogRef = this.dialog.open(ImageDialogComponent, {
        maxHeight: '100%',
        panelClass: 'image-dialog-panel',
        backdropClass: 'image-dialog-backdrop',
        data: { img_selected: imgURL, img_array: this.getDownloadURL(),
        taskID: this.taskID$ }
      });
      this.location.replaceState("/tasks/" + this.taskID$ + "/attachments/" + imgNum);

    }, 1);
  }

  resizeOptions$: ResizeOptions = {
    resizeMaxHeight: 1200,
    resizeMaxWidth: 1200,
  };

  onInputFileChange(event) {

    let imageArray = event.target.files;

    for (let i = 0; i < imageArray.length; i++) {
      let image = event.target.files[i];

      this.ng2ImgMax.resizeImage(image, 1200, 1200).subscribe(
        result => {
          this.storage.uploadImageFile(this.taskID$, this.task$, result);
        },
        error => {
          console.log('😢 Oh no!', error);
        }
      );

    }




  }


}
