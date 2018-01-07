import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { storage } from 'firebase/app';
import { Task } from './model/task';
import { DataService } from './data.service';

@Injectable()
export class StorageService {

  constructor(private firebaseApp: FirebaseApp, private ds: DataService,
    public afAuth: AngularFireAuth, public afDb: AngularFireDatabase, ) {

    const storageRef = firebaseApp.storage();
  }

  uploadAttachment(taskID: String, task: Task, files: FileList) {

    let self = this;
   
    if(task.attachment_URL == null){
      task.attachment_URL = [];
    }

    for (var i = 0, numFiles = files.length; i < numFiles; i++) {

      var file = files[i]; // use the Blob or File API
      var fileRef = firebase.storage().ref(taskID + '/' + file.name);

      fileRef.put(file).then(function (snapshot) {

        self.ds.getDatabase().list('tasks/' + taskID + '/attachment_URL').push(snapshot.downloadURL);

      });
    }
  }
}
