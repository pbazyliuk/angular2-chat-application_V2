import { Component, OnInit } from '@angular/core';
import { MessageInputService } from "app/chat/message-input/message-input.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";

@Component({
  selector: 'ct-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  messages = [];
  connection;
  message;
  author;
  
  constructor(private messageinputservice: MessageInputService, private store: Store<ApplicationState>) {
    store.subscribe(
      state => {
        console.log("Message-Input component received state", state)
        this.author = state.uiState.user.firstname;
      }
    )
  }

  sendMessage(){
    this.messageinputservice.sendMessage(this.message, this.author);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.messageinputservice.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}