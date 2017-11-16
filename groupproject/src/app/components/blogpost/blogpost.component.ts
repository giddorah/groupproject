import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../services/database.service';
import { Observable } from 'rxjs/Observable';
import { ReversePipe } from 'ngx-pipes';


@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss'],
  providers: [ReversePipe]
})
export class BlogpostComponent implements OnInit {

  blogCollections: Observable<any>;

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.blogCollections = this.database.getBlogs();
  }

  timeCal(blog) {
    var date = new Date(blog.time);
    var month = "" + (date.getMonth() + 1);
    month.length == 1 ? month = "0" + month : month
    var day = "" + date.getDate();
    day.length == 1 ? day = "0" + day : day
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  }

  sortByTags(tagsToFilterBy) {
    this.blogCollections = this.blogCollections.map(blog => 
      blog.filter(blog => blog.tags === tagsToFilterBy));
  }

  sortByName(nameToFilterBy) {
    this.blogCollections = this.blogCollections.map(blog => 
      blog.filter(blog => blog.name === nameToFilterBy));
  }

}
