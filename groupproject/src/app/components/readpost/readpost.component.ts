import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service'

@Component({
  selector: 'app-readpost',
  templateUrl: './readpost.component.html',
  styleUrls: ['./readpost.component.scss']
})
export class ReadpostComponent implements OnInit {

  @Input() passedKey: string;

  blog: any

  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.database.getBlogByKey(this.passedKey).subscribe( exp => {
      this.blog = exp;
      this.expFormGroup.reset({
        company: this.experience.company,
        dateFrom: this.experience.dateFrom,
        dateTo: this.experience.dateTo,
        position: this.experience.position,
        assignments: this.experience.assignments,
        techniques: this.experience.techniques,
      });
    });
  }

}
