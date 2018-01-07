import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class StorageService {

  constructor(private firebaseApp: FirebaseApp,
    public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, ) {

    const storageRef = firebaseApp.storage();
  }

  getAttachments(taskId: string) {
    // Create a reference with an initial file path and name
    var storage = firebase.storage();
    var storageRef = storage.ref('tornador/' + taskId + '/');

    // Create a reference to the file we want to download
    var starsRef = storageRef.child(' icon_128x128.png');

    // Get the download URL
    starsRef.getDownloadURL().then(function (url) {

      // Insert url into an <img> tag to "download"
    
      console.log(url);

    }).catch(function (error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object_not_found':
          console.log('storage/object_not_found');
          break;

        case 'storage/unauthorized':
          console.log('storage/unautorized');
          break;

        case 'storage/canceled':
          console.log('storage/canceled');
          break;

        case 'storage/unknown':
          console.log('storage/unknown');
          break;
      }
    });

  }

  uploadAttachment(files: FileList) {


    // Create a root reference
    const storageRef = firebase.storage().ref();

    for (var i = 0, numFiles = files.length; i < numFiles; i++) {

      var file = files[i]; // use the Blob or File API

      console.log(file.name);
      console.log('put file');

      storageRef.put(file).then(function (snapshot) {
        console.log('Uploaded a blob or file!');
      });

    }
  }
}
