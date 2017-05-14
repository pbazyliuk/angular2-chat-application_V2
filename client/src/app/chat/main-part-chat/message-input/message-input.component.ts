import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { WsService } from "app/ws.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { MessageAddSuccessActions, GetAllMessagesSuccessActions } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import { Message } from "app/core/models/message";
// import { Http } from "@angular/http";
import { MessageInputService } from "app/chat/main-part-chat/message-input/message-input.service";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";

@Component({
  selector: 'ct-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit, OnDestroy {
  //messages$: Observable<object>;
  private connection;
  private messageText: string;
  message: Message;
  author: string;
  authorId;

  //@Input() model;

  @Output() notify: EventEmitter<object> = new EventEmitter<object>();
  
   constructor(private ws: WsService, private store: Store<ApplicationState>, 
   private MessageInputService: MessageInputService,
   private MainPartChatService: MainPartChatService) {
      store.subscribe(
      state => {
        console.log("Message Input Component section received state", state);
        // this.just = state.storeData.messages;
        this.authorId = state.uiState.user._id;
        this.author = state.uiState.user.firstname;
        // this.message = {
        //   userId: 1,
        //   text: 'null',
        //   timestamp: 1
        // }
      }
    )
      // this.messages$ = store
      //   .map(this.mapStatetoMessages)
      
   }


  // mapStatetoMessages(state: ApplicationState) {

  //   return state.storeData.messages;

  // }

   sendMessage () {
     this.message = {
       userId: this.authorId,
       userName: this.author,
       timestamp: Date.now(),
       text: this.messageText
     };
    // this.message.userId = 1;
    // this.message.timestamp = 123;
    // this.message.text = this.messageText;
    this.ws.sendMessage(this.message);
    this.MessageInputService.sendMessage(this.message)
      .subscribe(message => {
            console.error('API', message)
        }) 
    this.MainPartChatService.updateData(this.message);
    // this.notify.emit(this.message);  

      this.messageText = '';
      
    }
    
   ngOnInit() {
     console.error('Message Input Oninit')
     //console.log('model', this.model)
    //  console.log(this.just.length)
     
    //  if(this.just.length < 1) {
      console.error('MESSAGES INPUT INIT')
     

      //this.model
      // this.connection
      //   .subscribe(message => {
      //     console.log(message);
      //     this.store.dispatch(new MessageAddSuccessActions(message))
      //   })
        this.MessageInputService.getAllMessages()
          .subscribe(messages => {
                console.error(messages);
                this.store.dispatch(new GetAllMessagesSuccessActions(messages))
            })
  }
  
  ngOnDestroy() {
    //this.connection.unsubscribe();
  }

}
