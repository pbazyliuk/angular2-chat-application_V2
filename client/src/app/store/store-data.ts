
import { User } from "app/core/models/user";
import { Message } from "app/core/models/message";
import { Chat } from "app/core/models/chat";

export interface StoreData {
    users: User[];
    messages: Message[];
    chats: Chat[];
}