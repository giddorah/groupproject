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
        this.blogList = database.list('collectionOfBlogs');
        this.blogObject = database.object('collectionOfBlogs');
        this.firebase = firebase;
    }


    public addBlog(blog: Blog)
    {
        this.blogList.push(blog);
    }

    public deleteBlog(key: string) {

        this.blogList.remove(key);
    }

    public getBlogs() {

        return this.database.list('collectionOfBlogs').valueChanges();

    }


<<<<<<< HEAD
    // public getKeys() {

    //    const keyArray = [];
    //    this.firebase.database().ref("BlogCollection").on("child_added", snapshot => {
    //        keyArray.push(snapshot.key);
    //    });

    //    return keyArray;
    // }
=======
    public getKeys() {
     
        const keyArray = [];
        this.firebase.database().ref("BlogCollection").on("child_added", snapshot => {
            keyArray.push(snapshot.key);
        });

        return keyArray;
    }


    getBlogsAndKey() {

        return this.blogList.snapshotChanges().map(changes => {
            return changes.map(c => ({
                key: c.payload.key, ...c.payload.val()
            }));
        });
    }
>>>>>>> 762a10031229efaf3d50f3ba93170897327e11d3




}


interface Blog {
    name: string;
    title: string;
    time: string;
    tags: string;
    message: string;
}

