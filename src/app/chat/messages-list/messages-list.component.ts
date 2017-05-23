import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'ct-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  private messages$: Observable<object>;

  constructor(private store: Store<ApplicationState>) { 
    this.messages$ = store
      .map(this.mapStatetoMessages)
  }

mapStatetoMessages(state: ApplicationState) {
  return state.storeData.messages;
}

  ngOnInit() {
    
  }

}
