import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { Observable } from "rxjs/Observable";
import { User } from "app/core/models/user";
import { ChatMenuService } from "app/chat/chat-menu/chat-menu.service";
import { UsersListService } from "app/chat/users-list/users-list.service";
import { LoadChatsListActions } from "app/store/actions";
import * as _ from "lodash" 


@Component({
  selector: 'ct-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.css']
})
export class ChatMenuComponent implements OnInit {
  private users$: Observable<User[]>
  private currentUser;
  private chat = {
    name: '',
    users: ''
  };

  constructor(private store: Store<ApplicationState>, private ChatMenuService: ChatMenuService) {
      
    store.subscribe(state => {
      return this.currentUser = state.uiState.user
    })
    this.users$ = store
        .map(this.mapStatetoAllUsers)
  }

  mapStatetoAllUsers(state: ApplicationState) {
    let currentUsername = state.uiState.user.firstname;
    
    let users = state.storeData.users;

    return users.filter((user) => {
      if(user["firstname"] === currentUsername) {
        return false;
      }
      return true;
    })
    // return state.storeData.users;
 }

 addChat(event: Event, data) {
   event.preventDefault();
   data.users.unshift(this.currentUser)
   data.users = data.users.sort();
   this.ChatMenuService.sendChatData(data);
   this.chat.name = '';
   this.chat.users = '';
  
 }

  ngOnInit() {
    
  }

}
