import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {


  isComplete$: Boolean; false;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 



    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseButtonClick(){
    this.dialogRef.close();
  }

  markAsComplete(){
    this.isComplete$ = true;
  }



}



