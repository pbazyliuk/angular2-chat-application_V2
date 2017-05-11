import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";

@Component({
  selector: 'ct-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  private messages$: Observable<object>;
  private author: string;
  constructor(private store: Store<ApplicationState>) { 
    
    store.subscribe(state => {
      return this.author = state.uiState.user.firstname
    })

    this.messages$ = store
      .map(this.mapStatetoMessages)
  }

  mapStatetoMessages(state: ApplicationState) {
    return state.storeData.messages;
  }

  ngOnInit() {
  }

}
