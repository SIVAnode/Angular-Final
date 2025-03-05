import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-detail',
  standalone: false,
  templateUrl: './students-detail.component.html',
  styles: ``
})
export class StudentsDetailComponent {
  fullName: string;
  studentId : string
  constructor(private ActivatedRoute:ActivatedRoute){
    console.log(this.ActivatedRoute)
    this.studentId = this.ActivatedRoute.snapshot.params['id']
    const name = this.ActivatedRoute.snapshot.queryParams['name'];
    const lastName = this.ActivatedRoute.snapshot.queryParams['lastName'];

    this.fullName = `${name} ${lastName}`;
  }

}