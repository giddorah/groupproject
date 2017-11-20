import { Component, OnInit, Input } from '@angular/core';
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

  // Passed from home.component.html
  @Input() passedKey: string


  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    if (typeof this.passedKey !== 'undefined') {
      var keyArray = this.passedKey.split("="); // this wil not work if name contains '='!!!
      if (keyArray[0] == "name") {
        this.filterByName(keyArray[1]);
      }
      else if (keyArray[0] == "time") {
        this.filterByTime(keyArray[1]);
      }
      else if (keyArray[0] == "tag") {
        this.filterByTag(keyArray[1]);
      }
    }
    else {
      this.getBlogs();
    }
  }



  getBlogs() {
    this.blogCollections = this.database.getBlogsAndKey();
  }

  timeCal(time: number) {
    var date = new Date(time);
    var month = "" + (date.getMonth() + 1);
    month.length == 1 ? month = "0" + month : month
    var day = "" + date.getDate();
    day.length == 1 ? day = "0" + day : day
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  }

  findTag(tags, tagToFind) {
    var tagToSendBack = tags[0];
    tags.forEach(tag => {
      if (tag === tagToFind) {
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
      blog.filter(blog => this.timeCal(blog.time) === timeToFilterBy));
  }
  tagsArray(tags) {
    return this.tagArray = tags;
  }

}
