import { Component, OnInit } from '@angular/core';

import { ChatListService } from "./chat-list.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadChatListActions } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import { User } from "app/core/models/user";
import { mapStatetoUsers } from "app/chat/chat-list/mapStateToUsers";


@Component({
  selector: 'ct-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

 // private userName$: Observable<string>;

  private users$: Observable<User[]>

  constructor(private chatlistservice: ChatListService, private store: Store<ApplicationState>) {
      // this.userName$ = store
      //   .map(this.mapStatetoUserName)
        
     this.users$ = store
        .map(mapStatetoUsers)
   
   
   }

  //  mapStatetoUsers(state: ApplicationState): User[] {
  //    return state.storeData.users;
  //  }

    // mapStatetoUserName(state: ApplicationState): string {
    //   return state.uiState.user.firstname;
    // }
  
      //.map(mapStateToUsers)
        
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
