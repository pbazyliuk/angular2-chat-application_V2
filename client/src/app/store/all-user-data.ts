


import { Message } from "app/core/models/message";
import { User } from "app/core/models/user";
import { Chat } from "app/core/models/chat";

export interface AllUserData {
    users: User[];
    chats: Chat[];
    messages: Message[];
}