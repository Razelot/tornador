import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { DataService } from './data.service';

export const firebaseConfig = {
  apiKey: "AIzaSyBnUbpMJpFC7wL2_PibQ3Kfx1jtRmge_AY",
  authDomain: "tornador-bcc1d.firebaseapp.com",
  databaseURL: "https://tornador-bcc1d.firebaseio.com",
  projectId: "tornador-bcc1d",
  storageBucket: "tornador-bcc1d.appspot.com",
  messagingSenderId: "666816185870"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
