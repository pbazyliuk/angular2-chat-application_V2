import { Component, OnInit, OnDestroy } from '@angular/core';
import { WsService } from "app/ws.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { MessageAddSuccessActions } from "app/store/actions";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'ct-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit, OnDestroy {
  //messages$: Observable<object>;
  connection;
  message;
  just;
  author;
  
   constructor(private ws: WsService, private store: Store<ApplicationState>) {
      store.subscribe(
      state => {
        console.log("Message Input Component section received state", state);
        this.just = state.storeData.messages;
        this.author = state.uiState.user.firstname;
      }
    )
      // this.messages$ = store
      //   .map(this.mapStatetoMessages)
      
   }


  // mapStatetoMessages(state: ApplicationState) {

  //   return state.storeData.messages;

  // }

   sendMessage(){
    this.ws.sendMessage(this.message, this.author);
    this.message = '';
  }

   ngOnInit() {
     console.error('Message Input Oninit')
     console.log(this.just.length)
     
    //  if(this.just.length < 1) {
       console.error('MESSAGES INPUT INIT')
      this.connection = this.ws.initWs().subscribe(message => {
      //this.messages.push(message);
      this.store.dispatch(new MessageAddSuccessActions(message))
    })
    //  }
    
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
