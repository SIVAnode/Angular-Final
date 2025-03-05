import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollement from './enrollement.reducer';

export const selectEnrollementState = createFeatureSelector<fromEnrollement.State>(
  fromEnrollement.enrollementFeatureKey
);
export const selectEnrollments = createSelector(
  selectEnrollementState,
  (state) => state.enrollments
);

 export const selectIsLoadingEnrollments = createSelector(
  selectEnrollementState,
  (state) => state.isLoading
);

export const selectEnrollmentsError = createSelector(
  selectEnrollementState,
  (state) => state.error
);