import { Component, OnInit } from '@angular/core';

import { ThreadsService } from "app/core";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadUserThreadsAction } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import * as _ from "lodash";
import { Thread } from "app/shared/model/thread";
import { ThreadSummaryVM } from "app/chat/chat-list/thread-section/thread-summary.vw";


@Component({
  selector: 'ct-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM>
 

  constructor(
    private threadService: ThreadsService,
    private store: Store<ApplicationState> 
    ) {

      this.userName$ = store
        .skip(1)
        .map(this.mapStateToUserName)
         

       this.unreadMessagesCounter$ = store
        .skip(1)
        .map(this.mapStateToUnreadMessagesCounter);
    }

  mapStateToUserName(state: ApplicationState):string {
    return state.storeData.participants[state.uiState.userId].name;
  }

  mapStateToUnreadMessagesCounter(state: ApplicationState):number {

    const currentUserId = state.uiState.userId;

    return _.values<Thread>(state.storeData.threads) //take values from object and return an array of Threads
      .reduce(
        (acc, thread) => {
          //thread is current item of array which we are looping 
          return acc + thread.participants[currentUserId];
        } 
      ,0)
  }

  ngOnInit() {

    this.threadService.loadUserThreads()
      .subscribe(
        allUserData => this.store.dispatch(
          new LoadUserThreadsAction(allUserData)
        )
      );
  
  }

}
