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
            message: new FormControl('', Validators.required),
            tags: new FormControl('unsorted', Validators.required)
        });

    newBlog: Blog;
    showTagBar = false;


    constructor(private database: DatabaseService) {
    }

    ngOnInit() {
    }

    public addFormValue() {
        this.newBlog = this.blogFormGroup.value;
        this.newBlog.time = Date.now();
        this.database.addBlog(this.newBlog);
    }

    getBool(): Boolean {
        //this.expFormGroup.status === 'VALID' ? true : false;
        if (this.blogFormGroup.status === 'VALID')
            return true;
        else return false;
    }

    TextEnteredInMessage() {
        if (this.blogFormGroup.value.message != "") return true;
        else return false;
    }


    addTag() {
        this.blogFormGroup.setValue(
            {
                name: this.blogFormGroup.value.name,
                title: this.blogFormGroup.value.title,
                message: this.blogFormGroup.value.message,
                tags: ''
            }
        );
        this.showTagBar = true;
    }

}
interface Blog {
    name: string;
    title: string;
    time: number;
    tags: string;
    message: string;
}
