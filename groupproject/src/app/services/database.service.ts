import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// Import everything from firebase/app
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService {

    blogList: AngularFireList<Blog>;
    blogObject: AngularFireObject<Blog>;

    firebase: any;

    // Initialize our properties from our firebase database
    constructor(private database: AngularFireDatabase) {
        this.blogList = database.list('collectionOfBlogs');
        this.blogObject = database.object('collectionOfBlogs');
        this.firebase = firebase;
    }

    // Add blog to database
    public addBlog(blog: Blog) {
        this.blogList.push(blog);
    }



    // Get blogs from our database, and make sure it can be used asyncronous (like dynamically update changes made to site).
    public getBlogs() {

        return this.database.list('collectionOfBlogs').valueChanges();
    }




    getBlogsAndKey() {

        return this.blogList.snapshotChanges().map(changes => {
            return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
            }));
        });
    }

    public getBlogByKey(key: string) {
        return this.database.object('collectionOfBlogs/' + key).valueChanges();
    }
}

interface Blog {
    name: string;
    title: string;
    time: number;
    tags: string[];
    message: string;
}



//public getKeys() {

//    const keyArray = [];
//    this.firebase.database().ref("BlogCollection").on("child_added", snapshot => {
//        keyArray.push(snapshot.key);
//    });

//    return keyArray;
//}


//public deleteBlog(key: string) {

//    this.blogList.remove(key);
//}
