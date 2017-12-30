import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Modules
import 
{ 
  MatToolbarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatChipsModule, MatIconModule, MatTabsModule, MatCardModule, MatMenuModule, MatExpansionModule, 
  MatSnackBarModule, MatCheckboxModule,
} from '@angular/material';

import{ FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
declare var Hammer: any;
export class MyHammerConfig extends HammerGestureConfig  {
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

import { DataService } from './data.service';

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
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:taskID', component: TaskComponent },
  { path: 'tasks?new', component: NewTaskComponent },
  { path: 'tasks?filter', component: FilterDialogComponent }
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,

    MatToolbarModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule,
    MatIconModule, MatTabsModule, MatCardModule, MatMenuModule, MatExpansionModule, MatSnackBarModule, MatCheckboxModule, 
    
    FormsModule, ReactiveFormsModule,

    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []

  ],
  providers: [DataService, AuthService,
    { 
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
