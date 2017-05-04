
export interface UiState {
    user: object;
    authenticated: boolean;
}

export const INITIAL_UI_STATE: UiState = {
    user: undefined,
    authenticated: undefined
}