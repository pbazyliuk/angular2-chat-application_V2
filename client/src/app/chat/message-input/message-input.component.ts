import { Component, OnInit } from '@angular/core';
import { MessageInputService } from "app/chat/message-input/message-input.service";

@Component({
  selector: 'ct-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent implements OnInit {
  messages = [];
  connection;
  message;
  
  constructor(private messageinputservice: MessageInputService) {}

  sendMessage(){
    this.messageinputservice.sendMessage(this.message);
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