import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';

export const EnrollementActions = createActionGroup({
  source: 'Enrollement',
  events: {
    'Load Enrollements': emptyProps(),//disparador
    'Load Enrollements Success': props<{ data: Enrollment[] }>(),
    'Load Enrollements Failure': props<{ error: unknown }>(),

    'Create Enrollment': props<{ data: Omit<Enrollment, 'id'> }>(),
    'Create Enrollment Success': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),
    
    'Reset State': emptyProps(),


  }
});