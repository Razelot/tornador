import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewEncapsulation } from '@angular/core/src/metadata/view';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {


  taskID$: string;

  url$: string;
  urlArray$: string[];
  urlIndex$: number;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private location: Location
  ) {
    this.url$ = data.img_selected;
    this.urlArray$ = data.img_array;
    this.urlIndex$ = this.urlArray$.indexOf(this.url$);

    this.taskID$ = data.taskID;
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.location.replaceState("/tasks/" + this.taskID$ + "/attachments/");
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  onSwipe(action: String) {

    // next
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.urlIndex$ = (this.urlIndex$ - 1 + this.urlArray$.length) % this.urlArray$.length;
      this.url$ = this.urlArray$[this.urlIndex$];
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
      this.urlIndex$ = (this.urlIndex$ + 1) % this.urlArray$.length;
      this.url$ = this.urlArray$[this.urlIndex$];
    }

    var imgNum = this.urlIndex$ + 1;

    this.location.replaceState("/tasks/" + this.taskID$ + "/attachments/" + imgNum);

  }

}