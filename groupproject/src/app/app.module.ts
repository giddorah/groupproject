import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';

// Extern
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routes
import { RouterModule, Routes } from '@angular/router';



// Our routes
const appRoutes = [
  { path: '', component: HomeComponent},
  { path: 'admin', component: AdminComponent}

];



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
