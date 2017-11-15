import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService {

    blogList: AngularFireList<Blog>;
    blogObject: AngularFireObject<Blog>;

    firebase: any;

    constructor(private database: AngularFireDatabase) {
        this.blogList = database.list("BlogCollection");
        this.blogObject = database.object("BlogCollection");
        this.firebase = firebase;
    }


    public addBlog(blog: Blog)
    {
        this.blogList.push(blog);
    }

    public getBlogs() {

        return this.database.list("BlogCollection").valueChanges();
        
    }


    //public getKeys() {
     
    //    const keyArray = [];
    //    this.firebase.database().ref("BlogCollection").on("child_added", snapshot => {
    //        keyArray.push(snapshot.key);
    //    });

    //    return keyArray;
    //}


    


}


interface Blog {
    name: string;
    title: string;
    time: string;
    tags: string;
    message: string;
}

