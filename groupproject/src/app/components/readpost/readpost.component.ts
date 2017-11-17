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

    }


  ngOnInit()
  {

      this.key = this.activatedRoute.snapshot.params["key"];

      this.blog = this.database.getBlogByKey(this.key).subscribe(b => {

          this.blog = b;

      });


      console.log(this.blog);
      console.log(this.key);

    }

    timeCal(time : number) {
      var date = new Date(time);
      var month = "" + (date.getMonth() + 1);
      month.length == 1 ? month = "0" + month : month
      var day = "" + date.getDate();
      day.length == 1 ? day = "0" + day : day
      return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    filter(filterType, filterCriteria){
      return filterType + "=" +filterCriteria;
    }

    tagsArray(tags) {
      return this.tagArray = tags;
    }
}
