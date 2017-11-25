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
    if (typeof this.passedKey !== 'undefined') { // this will only happen if a key is passed to blogpost component. the key is at the end of the url
      var keyArray = this.passedKey.split("="); // the expected format of passedKey is "filterType=filterCriteria". so here the key is divided around the "=" and put into an array. if the filterCriteria where to contain a "=" this would divide the up the criteria into smaller pieces and only check the first one. 
      if (keyArray[0] == "name") { // if the first element in the keyArray, that is the "filterType", is equal to "name" it will know to filter by name.
        this.filterByName(keyArray[1]); // the second element, or "filterCriteria" is sent to filterByName method.
      }
      else if (keyArray[0] == "time") {
        this.filterByTime(keyArray[1]);
      }
      else if (keyArray[0] == "tag") {
        this.filterByTag(keyArray[1]);
      }
    }
    else {
      this.getBlogs(); // if there is no passedKey it will just get the full list.
    }
  }



  getBlogs() {
    this.blogCollections = this.database.getBlogsAndKey(); // gets the full list from the database.
  }

  timeCal(time: number) { // method for calculating the time based on milliseconda and returning it in a format more understandable
    var date = new Date(time); // the time in milliseconds from jan 1 1970 is entered into a Date-object.
    var month = "" + (date.getMonth() + 1); // the month is gotten. It counts from 0 so 1 has to be added. it is also saved as a string.
    month.length == 1 ? month = "0" + month : month // if the months is between 0-9 it will add a zero infront of it so it will be "01" instead of just "1". if it over 9 it will not add the zero so it WON't be "010"
    var day = "" + date.getDate(); // the day is gotten. unlike the month it counts from 1.
    day.length == 1 ? day = "0" + day : day
    return date.getFullYear() + "-" + month + "-" + day; // the year, month and day are combined in the correct format and returned to be used.
  }

  findTag(tags, tagToFind) { // method for checking if a tag exist in a posts tag list.
    var tagExists = false; // "tagExist" is set to false to begin with.
    tags.forEach(tag => { // search through the tags-array to see if it contains the correct tag.
      if (tag === tagToFind) {
        console.log(tag + " + " + tagToFind);
        tagExists = true; // if the correct tag exist "tagExist" is updated to reflect that.
        return; // after "tagExist" has been updated return is used to exit the anonymous-function. (does not exit the findTags-method.) 
      }
    });
    return tagExists; // returns whether the tag exists or not.
  }

  filterByTag(tagToFilterBy) { // Filters the blogPosts in the database by tag.
    // console.log(tagToFilterBy);
    this.getBlogs(); // blogCollection is updated to contain all blogposts in the database. this is done because if blogCollection has already been filtered through the new filter will only look att the ones in that filtered list.
    this.blogCollections = this.blogCollections.map(blogs => // as blogCollection is an observable a map has to be used to be able to access the content of it.
      blogs.filter(blog => // method to filter in the map.
        this.findTag(blog.tags, tagToFilterBy) // the method findTag is called to return if the correct tag exists or not in the list of tags for the current blogpost.
      ));
  }

  filterByName(nameToFilterBy) { // similar to "filterByTag"
    this.getBlogs();
    this.blogCollections = this.blogCollections.map(blogs =>
      blogs.filter(blog => blog.name === nameToFilterBy)); // unlike "filterByTag" there will only be one name per post. So no other method needs to be called. 
  }

  filterByTime(timeToFilterBy) { // similar to "filterByTag"
    this.getBlogs();
    this.blogCollections = this.blogCollections.map(blog =>
      blog.filter(blog => this.timeCal(blog.time) === timeToFilterBy)); // unlike "filterByTag" there will only be one name per post. So no other method needs to be called. 
  }

  filter(filterType, filterCriteria){ // Converts the filtering to make clicked filter active
    return filterType + "=" +filterCriteria;
  }

  tagsArray(tags) { // in blogpost.component.html the *ngFor loop on row 15, at the time of writting this comment, can't handle the tags-array in the blogs in blogsCollection so this method is called instead to convert into a string-array
    return this.tagArray = tags;
  }

}
