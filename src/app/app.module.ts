import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
