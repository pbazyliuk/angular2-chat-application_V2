

import { ApplicationState } from "app/store/application-state";
import { Thread } from "app/shared/model/thread";
import * as _ from "lodash";

export function mapStateToUnreadMessagesCounter(state: ApplicationState): number {

    const currentUserId = state.uiState.userId;

    return _.values<Thread>(state.storeData.threads) //take values from object and return an array of Threads
      .reduce(
        (acc, thread) => {
          //thread is current item of array which we are looping 
          return acc + thread.participants[currentUserId];
        } 
      ,0)
  }