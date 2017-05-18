import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserListService } from "./user-list.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadChatListActions } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import { User } from "app/core/models/user";
import { mapStatetoUsers } from "app/chat/user-list/mapStateToUsers";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'ct-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

 // private userName$: Observable<string>;
  private searchValue: string = '';
  private subscriptions: Subscription[] = [];


  private usersOn$: Observable<User[]>;


  constructor(private userlistservice: UserListService, private store: Store<ApplicationState>,
  private MainPartChatService: MainPartChatService) {
      // this.userName$ = store
      //   .map(this.mapStatetoUserName)
        
     this.usersOn$ = store
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
    this.userlistservice.getAllUsers()
      .subscribe(
        allUserData => this.store.dispatch(
          new LoadChatListActions(allUserData)
        ))
        this.subscriptions.push(this.MainPartChatService
          .getSearchValue()
          .subscribe(value => {
            this.searchValue = value;
            console.log('SEARCH', this.searchValue);
            return this.searchValue;
          })
        )
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
