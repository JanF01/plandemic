import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { MainMenuComponent } from './main/main-menu/main-menu.component';
import { MainbuttonComponent } from './main/main-menu/mainbutton/mainbutton.component';
import { SignupComponent } from './main/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlatformComponent } from './platform/platform.component';
import { DashboardComponent } from './platform/dashboard/dashboard.component';
import { NotesComponent } from './platform/notes/notes.component';
import { BottomNavComponent } from './platform/dashboard/bottom-nav/bottom-nav.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StorageComponent } from './platform/dashboard/storage/storage.component';
import { EditorComponent } from './platform/dashboard/editor/editor.component';
import { PinnedComponent } from './platform/dashboard/pinned/pinned.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CenterEditComponent } from './platform/dashboard/center-edit/center-edit.component';
import { AlertComponent } from './alert/alert.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  {
    path: 'platform',
    component: PlatformComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'notes', component: NotesComponent },
    ],
  },
  { path: '404', redirectTo: '' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    MainMenuComponent,
    MainbuttonComponent,
    SignupComponent,
    DashboardComponent,
    PlatformComponent,
    NotesComponent,
    BottomNavComponent,
    StorageComponent,
    EditorComponent,
    PinnedComponent,
    CenterEditComponent,
    AlertComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCardModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
