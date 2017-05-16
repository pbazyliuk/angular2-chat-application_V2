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
  private chatname2;
  private privateMessages$;
  // private chatname;
   constructor(private store: Store<ApplicationState>, private MainPartChatService: MainPartChatService) { 
    this.chatname2 = localStorage.getItem('chatname')
    store.subscribe(state => {
      console.log(this.chatname2)
      console.log('PRIVATE MESSAGE COMPONENT STATE', state)
    })

    console.log('123', this.chatname2)
    this.privateMessages$ = store
      .map(this.mapStatetoPrivateMessages)
  }

  mapStatetoPrivateMessages(state: ApplicationState) {
     console.log('PRIVATEEEE');
    //  this.chatname = this.MainPartChatService.getChatname() || '';
     console.log(state.storeData.chats[1].messageIds)
     console.log(this.chatname)
     console.log(this.chatname2)
    // state.storeData.chats.forEach((chat, index) => {
    //   if(chat["name"] === this.variables) {
    //     console.log('PRIVATEEEE', state.storeData.chats[index].messageIds)
        return state.storeData.chats[1].messageIds;
      }
    // })
  

  ngOnInit() {
    
    
  }

}
