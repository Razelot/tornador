import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DataService {

  itemsRef: AngularFireList<any>;

  constructor(private af: AngularFireDatabase) {

  }

  getTasks() {
    this.itemsRef = this.af.list('tasks');
    return this.itemsRef.valueChanges();
  }

  // getCharacter(character) {
  //   return this.af.object('/Characters/' + character, { preserveSnapshot: true });
  // }

  getDatabase() {
    return this.af;
  }

} 
