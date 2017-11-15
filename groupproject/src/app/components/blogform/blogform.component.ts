import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from './../../services/database.service';
@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.css']
})
export class BlogformComponent implements OnInit {

    blogFormGroup = new FormGroup(
        {
            name: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            time: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required),
            tags: new FormControl('', Validators.required)
        });

        newBlog: Blog;

  constructor(private database: DatabaseService) {
   }

  ngOnInit() {
  }

  public addFormValue() {
    this.newBlog = this.blogFormGroup.value;
    this.database.addBlog(this.newBlog);
        }


  getBool():Boolean{
    //this.expFormGroup.status === 'VALID' ? true : false;
    if(this.blogFormGroup.status === 'VALID')
    return true;
    else return false;
  }

  
}
interface Blog {
  name: string;
  title: string;
  time: string;
  tags: string;
  message: string;
}
