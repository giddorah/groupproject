import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../services/database.service';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    blogs: any;
    blogCollections: Observable<any>;


    constructor(
        private database: DatabaseService
    ) {

    }

    ngOnInit() {
        this.blogCollections = this.database.getBlogs();

        this.blogCollections.subscribe(blogArray => {
            this.blogs = blogArray;
            console.log(this.blogs);
        });

    }
}
