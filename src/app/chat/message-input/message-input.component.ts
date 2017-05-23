import { Component, OnInit } from '@angular/core';
import { MessageInputService } from "app/chat/message-input/message-input.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";
import { MessageAddSuccessActions } from "app/store/actions";

@Component({
  selector: 'ct-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  messages = [];
  connection;
  message;
  author;
  private socket;
  private url = 'https://chatappeleks.herokuapp.com'; 
  private observable; 
  isInit = false;

  constructor(private messageinputservice: MessageInputService, private store: Store<ApplicationState>) {
    store.subscribe(
      state => {
        console.log("Message-Input component received state", state)
        this.author = state.uiState.user.firstname;
      }
    )
  }

  sendMessage(){
    //this.messageinputservice.sendMessage(this.message, this.author);
    this.socket.emit('add-message', this.message, this.author);    
    this.message = '';
  }

  ngOnInit() {
    this.observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    // return observable
    .subscribe(message => {
      this.store.dispatch(
                new MessageAddSuccessActions(message)
              )
    })
  }  
      
    // this.connection = this.messageinputservice.getMessages()
    //   .subscribe(
    //     message => {
    //     this.messages.push(message);
    //   })
  
  
  ngOnDestroy() {
     //this.observable.unsubscribe();
  }
}