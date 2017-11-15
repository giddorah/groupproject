import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  constructor() { }

  ngOnInit() {
  }

}
