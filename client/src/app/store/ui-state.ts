
import { User } from "app/core/models/user";

export interface UiState {
    user: User; //object
    authenticated: boolean;
    usersOn: Array<object>;
}

export const INITIAL_UI_STATE: UiState = {
    user: undefined,
    authenticated: undefined,
    usersOn: []
    
}