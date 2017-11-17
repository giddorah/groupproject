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
  tagArray: string[];

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
      this.getBlogs();
  }



  getBlogs() {
    this.blogCollections = this.database.getBlogsAndKey();
  }

  timeCal(blog) {
    var date = new Date(blog.time);
    var month = "" + (date.getMonth() + 1);
    month.length == 1 ? month = "0" + month : month
    var day = "" + date.getDate();
    day.length == 1 ? day = "0" + day : day
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  }

  findTag(tags, tagToFind){
    var tagToSendBack = tags[0];
    tags.forEach(tag => {
      if(tag === tagToFind) {
        console.log(tag + " + " + tagToFind);
        tagToSendBack = tag;
        return;
      }
    });
    return tagToSendBack;
  }

  filterByTag(tagToFilterBy) {
    // console.log(tagToFilterBy);
    this.getBlogs();
    this.blogCollections = this.blogCollections.map(blogs =>
      blogs.filter(blog => 
       this.findTag(blog.tags, tagToFilterBy) === tagToFilterBy
    ));
  }

  filterByName(nameToFilterBy) {
    this.getBlogs();
    this.blogCollections = this.blogCollections.map(blogs =>
      blogs.filter(blog => blog.name === nameToFilterBy));
  }

  filterByTime(timeToFilterBy) {
    this.getBlogs();
    this.blogCollections = this.blogCollections.map(blog =>
      blog.filter(blog => this.timeCal(blog) === timeToFilterBy));
  }
  tagsArray(tags) {
    return this.tagArray = tags;
  }

}
