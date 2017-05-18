import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatListService } from "app/chat/chat-list/chat-list.service";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadChatsListActions } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import { Chat } from "app/core/models/chat";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";

@Component({
  selector: 'ct-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {
  private searchValue: string = '';
  private subscriptions: Subscription[] = [];
  
  private chatsOn$: Observable<Chat[]>

  constructor(private ChatListService: ChatListService, private store: Store<ApplicationState>,
  private http: Http,
  private MainPartChatService: MainPartChatService,
  private router: Router,) {
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

   select(chat) {
    //this.selectedId = chat.id;
    var obj = {selected: true}
    var name = chat.name;
    // this.http.put(`http://localhost:8090/api/chats/${name}`, chat)
    //  .subscribe(
    //     chatUpdate => {
    //     //   this.store.dispatch(
          
    //     //   new LoadChatsListActions(chatUpdata)
    //     //  );
    //      console.log('CHATS Update', chatUpdate);
    //     }
    //       )
    // // Navigate with relative link
    this.router.navigate(['chat', chat.name])
    
  }

  ngOnInit() {
    this.ChatListService.getAllChats()
     .subscribe(
        allChats => {
          this.store.dispatch(
          
          new LoadChatsListActions(allChats)
         );
         console.log('ALL CHATS', allChats);
        }
          )
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
