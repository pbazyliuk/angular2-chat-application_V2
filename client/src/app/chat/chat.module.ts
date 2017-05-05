import { NgModule } from '@angular/core';
// import { SharedModule }  from '../shared';
import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common'
import { ChatListComponent } from './chat-list';
import { ChatDetailsComponent } from './chat-details';
import { ChatNavbarComponent } from './chat-navbar/chat-navbar.component';
// import { UserSelectionComponent } from './chat-list/user-selection/user-selection.component';
// import { ThreadSectionComponent } from './chat-list/thread-section/thread-section.component';
// import { MessageSectionComponent } from './chat-details/message-section/message-section.component';
// import { ChatNewComponent } from './chat-new';
// import { ChatHolderComponent } from './chat-holder';
// import { ChatRoutingModule } from './chat-routing.module';
// import { MessagesSharedModule } from '../messages';
// import { ChatService } from './shared/chats.service';
// import { ChatNavbarComponent } from './chat-navbar/chat-navbar.component';
// import { ChatDetailsNavbarComponent } from './chat-details-navbar/chat-details-navbar.component';
// import { ChatMenuComponent } from './chat-menu/chat-menu.component';

// import { FilterChatByNamePipe } from './shared/chat-filter.pipe';


@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatDetailsComponent,
    ChatNavbarComponent,
    // UserSelectionComponent,
    // ThreadSectionComponent,
    // MessageSectionComponent,
    // ChatNewComponent,
    // ChatHolderComponent,
    // ChatNavbarComponent,
    // ChatDetailsNavbarComponent,
    // ChatMenuComponent,
    // FilterChatByNamePipe
  ],
  imports: [
    CommonModule
    // SharedModule,
    // MessagesSharedModule,
    // ChatRoutingModule
  ],
  providers: [] //ChatService
})

export class ChatModule {}
