
import { Action } from "@ngrx/store";
import { AllUserData } from "app/store/all-user-data";

export const LOAD_CHAT_LIST_ACTION = 'LOAD_CHAT_LIST_ACTION';

export class LoadChatListActions implements Action {
    type = LOAD_CHAT_LIST_ACTION;

    constructor(public payload?: AllUserData) {
        
    }
}