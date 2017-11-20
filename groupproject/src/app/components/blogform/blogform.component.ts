import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from './../../services/database.service';
@Component({
    selector: 'app-blogform',
    templateUrl: './blogform.component.html',
    styleUrls: ['./blogform.component.css']
})
export class BlogformComponent implements OnInit {

    blogFormGroup = new FormGroup( // blogFormGroup does not contain a field for time because that is handled later.
        {
            name: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required),
            tags: new FormControl('unsorted', Validators.required) // tags are set to be unsorted by default. this satifies validation, but validation is keept so the user can't remove the unsorted tag and then save without adding a new tag.
        });

    newBlog: Blog;
    showTagBar = false;


    constructor(private database: DatabaseService) {
    }

    ngOnInit() {
    }

    public addFormValue() { // method for getting the values from the blogFormGroup and saving them as a new blogpost in the database.

        this.newBlog = this.blogFormGroup.value; // the values are gotten from blogFormGroup and saved to new blog. 
        var tags = this.blogFormGroup.value.tags.split(" "); // blogFormGroup saved all the tags as one, so they have to be divided. split is used and they are divided around spaces. the result is saved in an array.
        tags = tags.filter((tag, index, self) => self.findIndex(t => t === tag) === index) // the new array of the tags are filter through so no dublicates occur.
        
        tags.forEach((tag,index) => { // the list is looked through again for empty tags, this occurs if two spaces follow eachother.
            if(tag == ""){
                tags.splice(index, 1); // splice goes to index and removes 1 element.
                return; // the anonymous method is exited after it has found an empty tag. there will only be one because if there where more they will have been removed as duplicates. 
            }
        });

        this.newBlog.tags = tags; // newBlogs tags are updated to the new array.
        this.newBlog.time = Date.now(); // the date and time is gotten and saved as a number, it will be the number of milliseconds since jan 1 1970.
        this.database.addBlog(this.newBlog); // newBlog is saved to the database.

        this.blogFormGroup.reset( // method for reseting the blogFormGroup
            {
                name: '',
                title: '',
                message: '',
                tags: 'unsorted' // tags are set to unsorted by default so the user dosn't have to set tags if they don't want to.
            }
        );
        this.showTagBar = false; // resets so the input is not shown and the add Tag button is shown instead.
    }

    getBool(): Boolean { // method for checking if the value in blogFormGroup is valid.
        //this.expFormGroup.status === 'VALID' ? true : false;
        if (this.blogFormGroup.status === 'VALID')
            return true;
        else return false;
    }

    TextEnteredInMessage() { // method for seeing if the user has entered text in the message input box. this is done to see if the label in it should show or not.
        if (this.blogFormGroup.value.message != "") return true;
        else return false;
    }


    addTag() { // method called when the add Tag button is pressed. it removes the unsorted tag from the blogFormGroup so the user can enter their own tags, whilst the other values are keept the same
        this.blogFormGroup.setValue(
            {
                name: this.blogFormGroup.value.name,
                title: this.blogFormGroup.value.title,
                message: this.blogFormGroup.value.message,
                tags: ''
            }
        );
        this.showTagBar = true; // the input field for tags is shown
    }
}

interface Blog { // interface for how a blogpost shall look.
    name: string;
    title: string;
    time: number;
    tags: string[];
    message: string;
}
