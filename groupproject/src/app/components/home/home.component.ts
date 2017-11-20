import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../services/database.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    blogCollections: Observable<any>;
    key: string;

    constructor(
        private database: DatabaseService,
        private activatedRoute : ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.key = this.activatedRoute.snapshot.params["key"]; // Gets the clicked key from snapshot
        this.blogCollections = this.database.getBlogs(); // Gets all blog-posts relevant to filter/tags
    
    }
}
