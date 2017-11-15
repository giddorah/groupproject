import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../services/database.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {

  blogCollections: Observable<any>;
  

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.blogCollections = this.database.getBlogs();
  }

}
