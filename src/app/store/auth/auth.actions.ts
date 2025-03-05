import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../modules/dashboard/pages/users/models";

export const AuthActions = createActionGroup({
    source:"autentication",
    events:{
        'set auth user' : props<{user:User}>(),
        'unset auth user': emptyProps(), 
    }
})