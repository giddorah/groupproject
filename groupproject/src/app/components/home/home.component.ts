import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../services/database.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  databaseService: any;
  blogCollections: Observable<any>;


  constructor(
    databaseService: DatabaseService
  ) {
    this.databaseService = databaseService;
  }

  ngOnInit() {
    this.blogCollections = this.databaseService.getBlogs();
  }
}
