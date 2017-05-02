import { ApplicationState } from "app/store/application-state";
import { Thread } from "app/shared/model/thread";
import { ThreadSummaryVM } from "app/chat/chat-list/thread-section/thread-summary.vw";
import * as _ from "lodash";

export function stateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
            const threads = _.values<Thread>(state.storeData.threads);

            return threads.map(_.partial(mapThreadToThreadSummary, state));
          }

          function mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
            const names = _.keys(thread.participants).map(
                  participantId => state.storeData.participants[participantId].name
                  );
                
                const lastMessageText = _.last(thread.messageIds);
                const lastMessage = state.storeData.messages[lastMessageText];

                return {
                  id: thread.id,
                  participantNames: _.join(names, ","),
                  lastMessageText: lastMessage.text,
                  timestamp: lastMessage.timestamp
                }
          }