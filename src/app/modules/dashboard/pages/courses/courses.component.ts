import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  isLoading = false;
  Error = false;
  isAdmin$: Observable<boolean>;
  dataSource: Course[] = [];

  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  handleCoursesUpdate(courses: Course[]): void {
    this.dataSource = [...courses];
  }

  openFormDialog(editingCourse?: Course): void {
    if (editingCourse) {
      console.log('Se va a editar: ', editingCourse);
    }
    this.matDialog
      .open(CourseFormDialogComponent, { data: { editingCourse } })
      .afterClosed()
      .subscribe({
        next: (data) => {
          console.log(data);
          if (!!data) {
            if (!!editingCourse) {
              this.updateCourse(editingCourse.id, data);
            } else {
              this.addCourse(data);
            }
          }
        },
      });
  }

  addCourse(data: { name: string; teacher: string; time: string }): void {
    this.isLoading = true;
    this.courseService.addCourse(data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: () => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  updateCourse(id: string, data: { name: string; teacher: string; time: string }) {
    this.isLoading = true;
    this.courseService.updateCourseById(id, data).subscribe({
      next: (data) => this.handleCoursesUpdate(data),
      error: () => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  onDelete(id: string): void {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;
      this.courseService.deleteCourseById(id).subscribe({
        next: (courses) => {
          this.handleCoursesUpdate(courses);
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    console.log('CoursesComponent inicializado');
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.isLoading = false;
        this.dataSource = [...courses];
      },
      error: (error) => {
        alert(error);
        this.Error = true;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}