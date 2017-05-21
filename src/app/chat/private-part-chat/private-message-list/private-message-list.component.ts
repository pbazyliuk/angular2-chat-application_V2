import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store/application-state';
import { MainPartChatService } from 'app/chat/main-part-chat/main-part-chat.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ct-private-message-list',
  templateUrl: './private-message-list.component.html',
  styleUrls: ['./private-message-list.component.css']
})

export class PrivateMessageListComponent implements OnInit, OnDestroy {
  @Input() chatname: string;

  public author;
  public privateMessages$;
  public storeConnection;

  public searchPrivateMessage = '';

  public subscriptions: Subscription[] = [];

  constructor(
     private store: Store<ApplicationState>,
     private MainPartChatService: MainPartChatService
     ) {
    this.storeConnection = store.subscribe(state => {
      console.log('PRIVATE MESSAGE COMPONENT STATE', state);
      this.author = state.uiState.user.firstname;
    });
    this.privateMessages$ = store
      .map(this.mapStatetoPrivateMessages);
  }

  mapStatetoPrivateMessages(state: ApplicationState) {
    console.log('PRIVATEEEE');
    let indexChat;
    state.storeData.chats.forEach((chat, index) => {
      if (chat['name'] === state.uiState.currentChat) {
       indexChat = index;
       console.log(indexChat);
      }
    });
    console.log(state.storeData.chats[indexChat].messageIds);
    return state.storeData.chats[indexChat].messageIds;
  }

  ngOnInit() {
    this.storeConnection.unsubscribe();
    this.subscriptions.push(this.MainPartChatService
      .getSearchMessage()
      .subscribe(value => this.searchPrivateMessage = value)
     );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
