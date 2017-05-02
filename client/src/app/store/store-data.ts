
import { Participant } from "app/shared/model/participant";
import { Thread } from "app/shared/model/thread";
import { Message } from "app/shared/model/message";

export interface StoreData {
    participants: {[key: number]: Participant};
    threads: {[key: number]: Thread};
    messages: {[key: number]: Message}
}

export const INITIAL_STORE_DATA: StoreData = {
    participants: {},
    threads: {},
    messages: {}
}