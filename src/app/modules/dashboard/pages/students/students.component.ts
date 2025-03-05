import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models/index';
import { generateRandomString } from '../../../../helpers/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../../../core/services/students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit, OnDestroy {

  studentForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'email', 'phone', 'nationality', 'actions'];
  studentsList: Student[] = [];
  isLoading = false;
  IdStudentEdit?: string | null = null;
  Error = false;
  studentsSubscription?: Subscription;

  constructor(private fb: FormBuilder, private matDialog: MatDialog, private StudentsService: StudentsService) {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      nationality: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStudentsFromObs();
  }

  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }

  loadStudentsFromObs(): void {
    this.isLoading = true;
    this.studentsSubscription = this.StudentsService.getStudentsObservable().subscribe({
      next: (students) => {
        this.studentsList = [...students];
        this.isLoading = false;
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

  loadstudentsPromise(): void {
    this.isLoading = true;
    this.StudentsService.getStudentsPromise()
      .then((student) => {
        this.studentsList = student;
        this.Error = false;
      })
      .finally(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        this.Error = true;
        alert(`Hubo un error ${error}`);
      });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      if (!!this.IdStudentEdit) {
        this.studentsList = this.studentsList.map((student) =>
          student.id === this.IdStudentEdit ? { ...student, ...this.studentForm.value } : student
        );
        this.IdStudentEdit = null;
      } else {
        this.studentsList = [
          ...this.studentsList,
          {
            id: generateRandomString(6),
            ...this.studentForm.value,
          },
        ];
      }
      this.studentForm.reset();
    }
  }

  onDelete(id: string) {
    if (confirm("Estas seguro de eliminar al estudiante?")) {
      this.studentsList = this.studentsList.filter((el) => el.id != id);
    }
  }

  onEdit(student: Student): void {
    this.IdStudentEdit = student.id;
    this.studentForm.patchValue({
      name: student.name,
      lastName: student.lastName,
      age: student.age,
      email: student.email,
      phone: student.phone,
      nationality: student.nationality,
    });
  }
}
