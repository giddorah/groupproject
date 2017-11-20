// Modules and components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReadpostComponent } from './components/readpost/readpost.component';
import { BlogformComponent } from './components/blogform/blogform.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { environment } from './../environments/environment';

// Database modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DatabaseService } from './services/database.service';

// Extern
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgPipesModule } from 'ngx-pipes';


// Forms
import { ReactiveFormsModule } from '@angular/forms';

// Routes
import { RouterModule, Routes } from '@angular/router';

// Our routes
const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'home/:key', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'readpost/:key', component: ReadpostComponent }
];

// Declarations and imports used through the app

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        AdminComponent,
        BlogformComponent,
        FooterComponent,
        BlogpostComponent,
        ReadpostComponent
    ],
    imports: [
        NgbModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        MDBBootstrapModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgPipesModule 
    ],
    providers: [DatabaseService],
    bootstrap: [AppComponent],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
