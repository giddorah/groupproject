import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service'
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-readpost',
  templateUrl: './readpost.component.html',
  styleUrls: ['./readpost.component.scss']
})
export class ReadpostComponent implements OnInit {

    //@Input() passedKey: string;
    key: string;
    blog: any;
    tagArray: string[];    
    
    constructor(private database: DatabaseService, private activatedRoute : ActivatedRoute)
    {
      // This constructor only injects a database and the routings for the project
    }


  ngOnInit()
  {
      // The key for the current read-more activated key.
      this.key = this.activatedRoute.snapshot.params["key"]; // Gets the key from the opened link

      // Opens the database item with the key gathered from the router above.
      this.blog = this.database.getBlogByKey(this.key).subscribe(b => {

          this.blog = b;

      });


      // console.log(this.blog);
      // console.log(this.key);

    }

    timeCal(time : number) { // Functionality to convert the blogpost ms-record to readable date.
      var date = new Date(time);
      var month = "" + (date.getMonth() + 1);
      month.length == 1 ? month = "0" + month : month
      var day = "" + date.getDate();
      day.length == 1 ? day = "0" + day : day
      return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    filter(filterType, filterCriteria){ // Converts the filtering to make clicked filter active
      return filterType + "=" +filterCriteria;
    }

    tagsArray(tags) { // Gets the current tags
      return this.tagArray = tags;
    }
}
