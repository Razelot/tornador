import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StorageService } from '../../../storage.service';
import { Ng2ImgMaxService } from 'ng2-img-max/dist/src/ng2-img-max.service';
import { reject } from 'q';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Subscription } from 'rxjs/Subscription';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {


  isComplete$: Boolean; false;
  promises$: Promise<any>[] = [];
  stringArray: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: StorageService,
    private ng2ImgMax: Ng2ImgMaxService) {

    this.uploadImages();
  }

  timer$ = -1;

  uploadImages() {

    let self = this;

    let subscriptionArray: Array<Subscription> = [];

    this.timer$ = self.data.imageArray.length;
    console.log('timer', this.timer$);

    for (let i = 0; i < self.data.imageArray.length; i++) {

      let image = self.data.imageArray[i];

      let uploadSubscription = self.ng2ImgMax.resizeImage(image, 1200, 1200).subscribe(
        result => {

          self.storage.uploadImageFile(self.data.taskId, self.data.task, result).then(() => {

            self.timer$--;
            console.log('timer', self.timer$);

            if(self.timer$ == 0){
              self.dialogRef.close();
            }

          });
        },
        error => {
          console.log('😢 Oh no!', error);
        });
      
    }




  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseButtonClick() {
    this.dialogRef.close();
  }

  markAsComplete() {
    this.isComplete$ = true;
  }



}



