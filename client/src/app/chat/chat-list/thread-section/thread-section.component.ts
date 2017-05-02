import { Component, OnInit } from '@angular/core';

import { ThreadsService } from "app/core";
import { Store } from "@ngrx/store";
import { ApplicationState } from "app/store/application-state";
import { LoadUserThreadsAction } from "app/store/actions";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'ct-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;

  constructor(
    private threadService: ThreadsService,
    private store: Store<ApplicationState> 
    ) { 
      this.userName$ = store
        .skip(1)
        .map(this.mapStateToUserName)
         
    }

  mapStateToUserName(state: ApplicationState):string {
    return state.storeData.participants[state.uiState.userId].name;
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
