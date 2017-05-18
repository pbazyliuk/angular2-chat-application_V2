import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";

@Component({
  selector: 'ct-chat-navbar',
  templateUrl: './chat-navbar.component.html',
  styleUrls: ['./chat-navbar.component.css']
})
export class ChatNavbarComponent implements OnInit {

  public isChatListFolded: boolean;
  public isChatMenuShown: boolean;

   private searchValue: string = '';

  constructor(private MainPartChatService: MainPartChatService) { }

  @Output() notifyChatListFold: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifyChatMenuShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  onBlur(): void {
    this.searchValue = '';
    this.MainPartChatService.setSearchValue('');
  }

  onSearchValueChange(value: string): void {
    this.MainPartChatService.setSearchValue(value);
  }

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
