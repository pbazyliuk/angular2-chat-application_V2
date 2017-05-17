import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";

@Component({
  selector: 'ct-private-message-list',
  templateUrl: './private-message-list.component.html',
  styleUrls: ['./private-message-list.component.css']
})
export class PrivateMessageListComponent implements OnInit {
  @Input() chatname: string;

  //private chatname;
  private privateMessages$;
  private storeConnection;
   constructor(private store: Store<ApplicationState>, private MainPartChatService: MainPartChatService) { 
    this.storeConnection = store.subscribe(state => {
      console.log('PRIVATE MESSAGE COMPONENT STATE', state)
      //this.chatname = state.uiState.currentChat
    })

    this.privateMessages$ = store
      .map(this.mapStatetoPrivateMessages)
  }

  mapStatetoPrivateMessages(state: ApplicationState) {
     console.log('PRIVATEEEE');
     var indexChat;
    //  this.chatname = this.MainPartChatService.getChatname() || '';
     console.log(state.storeData.chats[1].messageIds)
     console.log(state.uiState.currentChat)

    state.storeData.chats.forEach((chat, index) => {
      if(chat["name"] === state.uiState.currentChat) {
        //console.log('PRIVATEEEE CHAT FIND', state.storeData.chats[index].messageIds)
       indexChat = index;
       console.log(indexChat)
      }
    })
    console.log(state.storeData.chats[indexChat].messageIds);
   return state.storeData.chats[indexChat].messageIds;
  }
    // })
  

  ngOnInit() {
    this.storeConnection.unsubscribe();
    
  }

}
