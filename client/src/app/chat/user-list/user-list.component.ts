import { Component, OnInit } from '@angular/core';

import { UserListService } from "./user-list.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadChatListActions } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import { User } from "app/core/models/user";
import { mapStatetoUsers } from "app/chat/user-list/mapStateToUsers";


@Component({
  selector: 'ct-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 // private userName$: Observable<string>;

  private usersOn$: Observable<User[]>

  constructor(private userlistservice: UserListService, private store: Store<ApplicationState>) {
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
