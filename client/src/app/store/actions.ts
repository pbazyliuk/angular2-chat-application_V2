
import { Action } from "@ngrx/store";
import { AllUserData } from "app/store/all-user-data";

export const LOAD_CHAT_LIST_ACTION = 'LOAD_CHAT_LIST_ACTION';

export class LoadChatListActions implements Action {
    type = LOAD_CHAT_LIST_ACTION;

    constructor(public payload?: AllUserData) {
        
    }
}

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION';

export class LoginSuccessActions implements Action {
    type = LOGIN_SUCCESS_ACTION;

    constructor(public payload) {
        console.log(payload)
    }
}

export const LOGOUT_SUCCESS_ACTION = 'LOGOUT_SUCCESS_ACTION';

export class LogoutSuccessActions implements Action {
     type = LOGOUT_SUCCESS_ACTION;
     
}


export const REGISTER_SUCCESS_ACTION = 'REGISTER_SUCCESS_ACTION';

export class RegisterSuccessActions implements Action {
     type = REGISTER_SUCCESS_ACTION;
     
     constructor(public payload) {
        console.log(payload)
    }
}



export const UPDATE_PROFILE_SUCCESS_ACTION = 'UPDATE_PROFILE_SUCCESS_ACTION';

export class UpdateProfileSuccessActions implements Action {
     type = UPDATE_PROFILE_SUCCESS_ACTION;
     
     constructor(public payload) {
        console.log(payload)
    }
}

export const MESSAGE_ADD_SUCCESS_ACTION = 'MESSAGE_ADD_SUCCESS_ACTION';

export class MessageAddSuccessActions implements Action {
     type = MESSAGE_ADD_SUCCESS_ACTION;
     
     constructor(public payload) {
        console.log(payload)
    }
}

export const GET_ALL_MESSAGES_SUCCESS_ACTION = 'GET_ALL_MESSAGES_SUCCESS_ACTION';

export class GetAllMessagesSuccessActions implements Action {
     type = GET_ALL_MESSAGES_SUCCESS_ACTION;
     
     constructor(public payload) {
        console.log(payload)
    }
}

export const LOAD_CHATS_LIST_SUCCESS_ACTION = 'LOAD_CHATS_LIST_SUCCESS_ACTION';

export class LoadChatsListActions implements Action {
     type = LOAD_CHATS_LIST_SUCCESS_ACTION;
     
     constructor(public payload) {
        console.log(payload)
    }
}
