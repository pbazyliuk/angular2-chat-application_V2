import { Component, OnInit } from '@angular/core';
import { ChatListService } from "./chat-list.service";

@Component({
  selector: 'ct-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {


  constructor(private chatlistservice: ChatListService) { }
  
  private users = [];

  ngOnInit() {
    this.chatlistservice
      .getAllUsers()
      .subscribe(this.onLoginSuccess.bind(this), this.onLoginError)

  }

  onLoginError (err){
    console.error(err);
    alert('User not found')
  }

  onLoginSuccess (res: any): void {
     console.log(res);
  }


}
