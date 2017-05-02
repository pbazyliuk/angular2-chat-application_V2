
import { StoreData } from "app/store/store-data";
import { UiState } from "app/store/ui-state";

export interface ApplicationState {
    uiState: UiState,
    storeData: StoreData
}