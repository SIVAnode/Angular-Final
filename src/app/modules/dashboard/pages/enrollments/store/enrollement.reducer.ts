import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollementActions } from './enrollement.actions';
import { Enrollment } from '../models';
import { generateRandomString } from '../../../../../helpers/utils';

export const enrollementFeatureKey = 'enrollement';

export interface State {
  enrollments:Enrollment[],
  isLoading: boolean,
  error:unknown

}

export const initialState: State = {
  enrollments:[],
  isLoading: false,
  error:null

};

export const reducer = createReducer(
  initialState,
  on(EnrollementActions.loadEnrollements, state => {
    return{
      ...state,
      isLoading:true,
    };
  }),
  on(EnrollementActions.loadEnrollementsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: action.data,
      isLoading: false,
      error: null,
    };
  }),
  on(EnrollementActions.loadEnrollementsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),



  on(EnrollementActions.createEnrollment, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(EnrollementActions.createEnrollmentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      enrollments: [...state.enrollments, action.data]
    };
  }),
  on(EnrollementActions.createEnrollmentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  on(EnrollementActions.resetState, () => initialState),
  on(EnrollementActions.loadEnrollementsSuccess, (state, action) => state),
  on(EnrollementActions.loadEnrollementsFailure, (state, action) => state),
);

export const enrollementFeature = createFeature({
  name: enrollementFeatureKey,
  reducer,
});