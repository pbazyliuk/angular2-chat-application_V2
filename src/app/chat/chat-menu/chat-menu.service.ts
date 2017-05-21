import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ChatListService } from 'app/chat/chat-list/chat-list.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { LoadChatsListActions } from 'app/store/actions';
import { WsService } from 'app/ws.service';


@Injectable()
export class ChatMenuService {

constructor(
private http: Http,
private router: Router,
private ChatListService: ChatListService,
private store: Store<ApplicationState>,  private ws: WsService
) {}

sendChatData(formAddChatData) {
this.http.post('https://chatappeleks.herokuapp.com/api/chats', formAddChatData).map(res => res.json())
.subscribe(userInfo => {
console.error('userInfo', userInfo);
this.ChatListService.getAllChats()
.subscribe(
allChats => {
this.store.dispatch(
new LoadChatsListActions(allChats)
);
console.log('ALL CHATS MENU', allChats);
this.ws.addChat(formAddChatData);
});
});
}
}
