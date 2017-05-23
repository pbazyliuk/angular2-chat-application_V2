import { Component, OnInit, Input } from '@angular/core';
import { MainPartChatService } from 'app/chat/main-part-chat/main-part-chat.service';

@Component({
  selector: 'ct-private-message-navbar',
  templateUrl: './private-message-navbar.component.html',
  styleUrls: ['./private-message-navbar.component.scss']
})

export class PrivateMessageNavbarComponent implements OnInit {
  @Input() chatname: string;
  public searchPrivateMessage = '';

  constructor(private MainPartChatService: MainPartChatService) { }

  onSearchPrivateMessageChange(value: string): void {
    this.MainPartChatService.setSearchMessage(value);
    console.log('onSearchPrivateMessageChange', value);
  }

  ngOnInit() {}
}
