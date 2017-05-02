
import { Participant } from "app/shared/model/participant";
import { Thread } from "app/shared/model/thread";

export interface StoreData {
    participants: {[key: number]: Participant};
    threads: {[key: number]: Thread};
    messages: {[key: number]: Message}
}