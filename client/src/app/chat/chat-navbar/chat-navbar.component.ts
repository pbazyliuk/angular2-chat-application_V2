import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ct-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.css']
})
export class ChatNavbarComponent implements OnInit {

  public isChatListFolded: boolean;
  public isChatMenuShown: boolean;

  constructor() { }

  @Output() notifyChatListFold: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifyChatMenuShow: EventEmitter<boolean> = new EventEmitter<boolean>();


  foldChatList() {
    this.isChatListFolded = !this.isChatListFolded;
    this.notifyChatListFold.emit(this.isChatListFolded);
    console.log('BTN ARROW')
  }

  showChatMenu() {
    this.isChatMenuShown = !this.isChatMenuShown;
    this.notifyChatMenuShow.emit(this.isChatMenuShown);
    console.log('Menu Show')
  }

  ngOnInit() {
  }

}
