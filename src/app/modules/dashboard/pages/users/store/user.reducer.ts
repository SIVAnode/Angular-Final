import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const userFeatureKey = 'user';

export interface State {
    users:User[];
}

export const initialState: State = {
     users: [],
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state)=>{
    return{
      ...state,
      users:[{
        id: "asdas",
        name:"Daniel",
        accessToken:"asdasdasd",
        email:"admin@coder.com",
        password:'987654',
        role:"ADMIN"
      },
      {
        id: "asdfef",
        name:"Daniela",
        accessToken:"asdasdasd",
        email:"user@coder.com",
        password:'456789',
        role:"EMPLOYEE"
      }
    ]
    }
  }),
  on(UserActions.deleteUserById, (state, action) => {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== action.id),
    };
  }),
  on(UserActions.resetState, () => initialState)

);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
