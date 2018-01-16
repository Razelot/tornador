import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2ImgMaxModule } from 'ng2-img-max';

// Material Modules
import {
  MatToolbarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatChipsModule, MatIconModule, MatTabsModule, MatCardModule, MatMenuModule, MatExpansionModule,
  MatSnackBarModule, MatCheckboxModule, MatSidenavModule, MatGridListModule, MatProgressSpinnerModule,
} from '@angular/material';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
declare var Hammer: any;
export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "pan-y"
    });
    return mc;
  }
}

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'firebase/storage';

import { DataService } from './data.service';
import { NavigationService } from './navigation.service';
import { AuthGuard } from './auth.guard';


import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthService } from './auth.service';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskOverviewComponent } from './task/task-overview/task-overview.component';
import { TaskCardComponent } from './task-list/task-card/task-card.component';
import { FilterDialogComponent } from './task-list/filter-dialog/filter-dialog.component';
import { FilterService } from './task-list/filter-dialog/filter.service';
import { TaskChatComponent } from './task/task-chat/task-chat.component';
import { TaskChatCardComponent } from './task/task-chat/task-chat-card/task-chat-card.component';
import { TaskAttachmentComponent } from './task/task-attachment/task-attachment.component';
import { StorageService } from './storage.service';
import { ImageDialogComponent } from './task/task-attachment/image-dialog/image-dialog.component';
import { LoginComponent } from './login/login.component';
import { ResponsiveComponent } from './responsive/responsive.component';
import { UploadDialogComponent } from './task/task-attachment/upload-dialog/upload-dialog.component';
export const firebaseConfig = {
  apiKey: "AIzaSyBnUbpMJpFC7wL2_PibQ3Kfx1jtRmge_AY",
  authDomain: "tornador-bcc1d.firebaseapp.com",
  databaseURL: "https://tornador-bcc1d.firebaseio.com",
  projectId: "tornador-bcc1d",
  storageBucket: "tornador-bcc1d.appspot.com",
  messagingSenderId: "666816185870"
};

const appRoutes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

    {
    path: 'tasks',
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: ResponsiveComponent },
      { path: ':taskID', component: ResponsiveComponent },
      { path: ':taskID/:tab', component: ResponsiveComponent },
      { path: ':taskID/:tab/:imgNum', component: ResponsiveComponent },
      { path: '?new', component: NewTaskComponent },
      { path: '?filter', component: FilterDialogComponent },
      { path: ':taskID/:tab?img', component: ImageDialogComponent },
      { path: ':taskID/:tab?upload', component: UploadDialogComponent },


  // {
  //   path: 'tasks',
  //   canActivateChild: [AuthGuard],
  //   children: [
  //     { path: '', component: ResponsiveComponent },
  //     { path: ':taskID', component: TaskComponent, canActivate: [AuthGuard] },
  //     { path: ':taskID/:tab', component: TaskComponent },
  //     { path: ':taskID/:tab/:imgNum', component: TaskComponent },
  //     { path: '?new', component: NewTaskComponent },
  //     { path: '?filter', component: FilterDialogComponent },
  //     { path: ':taskID/:tab?img', component: ImageDialogComponent },
  //     { path: ':taskID/:tab?upload', component: UploadDialogComponent },

  //   ]
  // },
  { path: 'responsive', component: ResponsiveComponent },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    SideMenuComponent,
    NewTaskComponent,
    TaskOverviewComponent,
    TaskCardComponent,
    FilterDialogComponent,
    TaskChatComponent,
    TaskChatCardComponent,
    TaskAttachmentComponent,
    ImageDialogComponent,
    LoginComponent,
    ResponsiveComponent,
    UploadDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule, AngularFireModule.initializeApp(firebaseConfig),

    AngularFireDatabaseModule,

    BrowserAnimationsModule,

    MatToolbarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule,
    MatIconModule, MatTabsModule, MatCardModule, MatMenuModule, MatExpansionModule, MatSnackBarModule, MatCheckboxModule,
    MatSidenavModule, MatGridListModule, MatProgressSpinnerModule,

    FormsModule, ReactiveFormsModule,
    Ng2ImgMaxModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [DataService, AuthService, NavigationService, FilterService, StorageService, AuthGuard,
    {
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
