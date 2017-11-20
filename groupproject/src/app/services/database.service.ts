import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService {

    blogList: AngularFireList<Blog>; // A list of AngularFireList with Blog objects
    blogObject: AngularFireObject<Blog>; // A blog object

    firebase: any; // The database

    constructor(private database: AngularFireDatabase) {
        // The constructor adds the data to the above variables from the database.
        this.blogList = database.list('collectionOfBlogs'); 
        this.blogObject = database.object('collectionOfBlogs');
        this.firebase = firebase;
    }

    public addBlog(blog: Blog) {
        // Pushes the contents from bloglist to blog.
        this.blogList.push(blog);
    }

    public deleteBlog(key: string) {
        // Not functional yet.
        this.blogList.remove(key);
    }

    public getBlogs() {
        // Gets all the blogs and lists (returns) them async, so they can be used for dynamically updating the webpage on changes.
        return this.database.list('collectionOfBlogs').valueChanges();
    }


    public getKeys() {
        // Gets all the unique keys from the blog database.
        const keyArray = []; // Empty array which will be filled with keys
        this.firebase.database().ref("BlogCollection").on("child_added", snapshot => {
            keyArray.push(snapshot.key); // Gathers key-data from BlogCollection each time a child is added
        });

        return keyArray; // Returns the array of keys gathered from above
    }

    getBlogsAndKey() {
        // Returns the blogs and the unique keys that each post has.
        return this.blogList.snapshotChanges().map(changes => {
            return changes.map(c => ({
                key: c.payload.key, ...c.payload.val() // "..." makes a copy of payload and adds the rest of the data.
            }));
        });
    }

    public getBlogByKey(key: string) {
        // Gets the unique key of the clicked "read more" post
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

