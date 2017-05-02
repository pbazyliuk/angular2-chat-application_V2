import { Component, OnInit } from '@angular/core';

import { ThreadsService } from "app/core";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadUserThreadsAction } from "app/store/actions";
import { Observable } from "rxjs/Observable";
import * as _ from "lodash";
import { Thread } from "app/shared/model/thread";
import { ThreadSummaryVM } from "app/chat/chat-list/thread-section/thread-summary.vw";
import { mapStateToUserName } from "app/chat/chat-list/thread-section/mapStateToUserName";
import { mapStateToUnreadMessagesCounter } from "app/chat/chat-list/thread-section/mapStateToUnreadMessagesCounter";
import { stateToThreadSummariesSelector } from "app/chat/chat-list/thread-section/stateToThreadSummariesSelector";


@Component({
  selector: 'ct-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>
 

  constructor(
    private threadService: ThreadsService,
    private store: Store<ApplicationState> 
    ) {

      this.userName$ = store
        .skip(1)
        .map(mapStateToUserName)
         

       this.unreadMessagesCounter$ = store
        .skip(1)
        .map(mapStateToUnreadMessagesCounter);

      this.threadSummaries$ = store
        .select(stateToThreadSummariesSelector);
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
