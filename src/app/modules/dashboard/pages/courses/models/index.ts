import { Teacher } from "../../teachers/models";


export interface Course {
    id:string,
    name:string,
    teacher:string,
    time:string,
    teachers?: Teacher[]

}