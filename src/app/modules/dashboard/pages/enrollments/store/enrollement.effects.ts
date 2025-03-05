import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollementActions } from './enrollement.actions';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';

@Injectable()
export class EnrollementEffects {
  private actions$ = inject(Actions);

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollementActions.loadEnrollements),
      concatMap(() =>
        this.enrollmentsService.getEnrollments().pipe(
          map((enrollments) =>
            EnrollementActions.loadEnrollementsSuccess({ data: enrollments })
          ),
          catchError((error) =>
            of(EnrollementActions.loadEnrollementsFailure({ error }))
          )
        )
      )
    );
  });
  
  createEnrollments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollementActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentsService.createEnrollment(action.data).pipe(
          map((enrollment) =>
            EnrollementActions.createEnrollmentSuccess({ data: enrollment })
          ),
          catchError((error) =>
            of(EnrollementActions.createEnrollmentFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private enrollmentsService: EnrollmentsService) {}
}