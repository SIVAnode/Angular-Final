import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Student } from '../../modules/dashboard/pages/students/models';
import { generateRandomString } from '../../helpers/utils';
import { delay, interval, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  getStudentsPromise(): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: generateRandomString(6),
            name: 'Yuji',
            lastName: 'Itadori',
            age: 16,
            email: "yuji@jujutsu.com",
            phone: 819012345678,
            nationality: "Japan"
          },
          {
            id: generateRandomString(6),
            name: 'Megumi',
            lastName: 'Fushiguro',
            age: 16,
            email: "megumi@jujutsu.com",
            phone: 818098765432,
            nationality: "Japan"
          },
        ]);
      }, 3000);
    });
  }

  getStudentsObservable(): Observable<Student[]> {
    return new Observable<Student[]>((subscriber) => {
      const students =  [
            {
              id: generateRandomString(6),
              name: 'Yuji',
              lastName: 'Itadori',
              age: 16,
              email: "yuji@jujutsu.com",
              phone: 819012345678,
              nationality: "Japan"
            },
            {
              id: generateRandomString(6),
              name: 'Megumi',
              lastName: 'Fushiguro',
              age: 16,
              email: "megumi@jujutsu.com",
              phone: 818098765432,
              nationality: "Japan"
            },
          ];

      setTimeout(() => { 
        students.push({
          id: generateRandomString(6),
          name: 'Nobara',
          lastName: 'Kugisaki',
          age: 16,
          email: "nobara@jujutsu.com",
          phone: 817011223344,
          nationality: "Japan"
        });
        subscriber.next(students);
        subscriber.complete();
      }, 1000);
    });
  }

  getInterval(): Observable<number> {
    return interval(1000);
  }

  getRoles(): Observable<string[]> {
    return of(['ADMIN', 'STUDENT', 'SELLER']).pipe(delay(1000));
  }
}