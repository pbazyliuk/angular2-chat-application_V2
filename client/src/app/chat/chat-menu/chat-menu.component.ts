import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { Observable } from "rxjs/Observable";
import { User } from "app/core/models/user";
import { ChatMenuService } from "app/chat/chat-menu/chat-menu.service";

@Component({
  selector: 'ct-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.css']
})
export class ChatMenuComponent implements OnInit {
  
  private users$: Observable<User[]>

  private chat = {
    name: '',
    users: ''
  };

  constructor(private store: Store<ApplicationState>, private ChatMenuService: ChatMenuService) { 
    this.users$ = store
        .map(this.mapStatetoAllUsers)
  }

  mapStatetoAllUsers(state: ApplicationState) {
    return state.storeData.users;
 }

 addChat(event: Event, data) {
   event.preventDefault();
   this.ChatMenuService.sendChatData(data);
   this.chat.name = '';
   this.chat.users = '';
 }

  ngOnInit() {
  }

}
