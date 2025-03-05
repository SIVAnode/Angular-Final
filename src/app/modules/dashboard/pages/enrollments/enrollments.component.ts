import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollementActions } from './store/enrollement.actions';
import { generateRandomString } from '../../../../helpers/utils';
import { forkJoin, Observable } from 'rxjs';
import { Enrollment } from './models';
import { selectEnrollments, selectEnrollmentsError, selectIsLoadingEnrollments} from './store/enrollement.selectors';
import { User } from '../users/models';
import { Course } from '../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import { CourseService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})


export class EnrollmentsComponent  implements OnInit{
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>; 

  courses: Course[] = [];
  students: User[] = [];
  enrollmentForm: FormGroup;

  constructor(
    private store: Store,
    private coursesService: CourseService,
    private usersService: UsersService,
    private fb: FormBuilder
  ){
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectIsLoadingEnrollments); 
    this.error$ = this.store.select(selectEnrollmentsError);
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }



  ngOnInit():void{
    this.store.dispatch(EnrollementActions.loadEnrollements())
    this.loadStudentsAndCourses()
  }


  ngOnDestroy(): void {
    this.store.dispatch(EnrollementActions.resetState());
  }

  loadStudentsAndCourses(): void {
    forkJoin([
      this.coursesService.getCourses(),
      this.usersService.getStudentUsers(),
    ]).subscribe({
      next: ([courses, students]) => {
        this.courses = courses;
        this.students = students;
      },
    });
  }

  createEnrollment(): void {
    this.store.dispatch(
      EnrollementActions.createEnrollment({
        data: {
          courseId: generateRandomString(6),
          studentId: generateRandomString(6),
        },
      })
    );
  }


  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        EnrollementActions.createEnrollment({ data: this.enrollmentForm.value })
      );
    }
  }
}
