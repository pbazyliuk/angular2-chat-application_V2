
import { Action } from "@ngrx/store";
import { AllUserData } from "app/shared/to/all-user-data";

export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';

export class LoadUserThreadsAction implements Action {
    type = 'LOAD_USER_THREADS_ACTION';
    
    constructor(public payload?: AllUserData) {
        
    }
}