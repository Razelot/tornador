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



  uploadImageFile(taskID: String, task: Task, file: File) {

    let self = this;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var hh = today.getHours();
    var nn = today.getMinutes();
    var ss = today.getSeconds();

    let now = "" + yyyy + mm + dd + hh + nn + ss;

    var fileRef = firebase.storage().ref(taskID + '/' + now + "-" + file.name);

    fileRef.put(file).then(function (snapshot) {

      self.ds.getDatabase().list('tasks/' + taskID + '/attachment_URL').push(snapshot.downloadURL);

    });

  }

}
