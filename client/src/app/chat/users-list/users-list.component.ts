import { Component, OnInit } from '@angular/core';
import { UsersListService } from "app/chat/users-list/users-list.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadChatsListActions } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import { Chat } from "app/core/models/chat";

@Component({
  selector: 'ct-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private chatsOn$: Observable<Chat[]>

  constructor(private UsersListService: UsersListService, private store: Store<ApplicationState>) {
    this.chatsOn$ = store
        .map(this.mapStatetoChats)

   }
   mapStatetoChats(state: ApplicationState) {
     let allChats = state.storeData.chats;
     let username = state.uiState.user.firstname;
     return allChats.filter(chat => {
         if(chat["usersNames"].includes(username)) {
           console.log(chat["usersNames"].includes(username))
            return true;
         }
         return false;
     })
   }

  ngOnInit() {
    this.UsersListService.getAllChats()
     .subscribe(
        allChats => {
          this.store.dispatch(
          
          new LoadChatsListActions(allChats)
         );
         console.log('ALL CHATS', allChats);
        }
          )
        
  }

}
