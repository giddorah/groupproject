import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';

=======
import { NgModule } from '@angular/core';
>>>>>>> aed0fe188d53886e79c6f85b37fdf87769178580
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { environment } from './../environments/environment';
// Extern
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



// Routes
import { RouterModule, Routes } from '@angular/router';


// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { BlogformComponent } from './components/blogform/blogform.component';


// Our routes
const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent }

];


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        AdminComponent,
        BlogformComponent
    ],
    imports: [
        NgbModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        MDBBootstrapModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
