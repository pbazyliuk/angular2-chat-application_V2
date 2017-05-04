import { Component, OnInit } from '@angular/core';
import { ChatListService } from "./chat-list.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadChatListActions } from "app/store/actions";

@Component({
  selector: 'ct-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {


  constructor(private chatlistservice: ChatListService, private store: Store<ApplicationState>) {
      store.subscribe(
        state => console.log('chat list received state', state)
    )
   }
  
  //private users = [];


  ngOnInit() {
    this.chatlistservice.getAllUsers()
    .subscribe(
      allUserData => this.store.dispatch(
        new LoadChatListActions(allUserData)
      )
    )
      // .getAllUsers()
      // .subscribe(this.onLoginSuccess.bind(this), this.onLoginError)

  }

  // onLoginError (err){
  //   console.error(err);
  //   alert('User not found')
  // }

  // onLoginSuccess (res: any): void {
  //    console.log(res);
  // }


}
