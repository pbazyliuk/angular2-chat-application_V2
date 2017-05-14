import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { WsService } from "app/ws.service";
import { ApplicationState } from "app/store/application-state";
import { MessageAddSuccessActions, GetAllMessagesSuccessActions } from "app/store/actions";
import { MessageInputService } from "app/chat/main-part-chat/message-input/message-input.service";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";

@Component({
  selector: 'ct-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public message;
  private connection;
  public isChatListFolded: boolean;
  public isChatMenuShown: boolean;

  constructor(private store: Store<ApplicationState>, private ws: WsService,
  private MessageInputService: MessageInputService,
  private MainPartChatService: MainPartChatService) {}

  onNotifyChatListFold(message:boolean):void {
    this.isChatListFolded = message;
  }

  onNotifyChatMenuShow(message:boolean):void {
    this.isChatMenuShown = message;
  }

  // onNotify(message:object):void {
  //   this.message = message;
  //   console.log('MESSAGE IN CHAT COMP', this.message)
  // }

  ngOnInit() {
    console.error('NGONINT')
    this.MainPartChatService.getData().subscribe(data => {
      console.log('MESSAGE on CHAT COMP', data);
        this.message = data;
      })
    
    this.connection = this.ws.initWs()
        .subscribe(message => {
          console.log(message);
          this.store.dispatch(new MessageAddSuccessActions(message))
        })
        // this.MessageInputService.getAllMessages()
        //   .subscribe(messages => {
        //         console.error(messages);
        //         this.store.dispatch(new GetAllMessagesSuccessActions(messages))
        //     })
     //this.connection = this.ws.initWs()
  //  this.ws.initWs()
  //   .subscribe(val => {
  //     console.log(val)
  //   })
}
ngOnDestroy() {
  this.connection.unsubscribe()
}

}
