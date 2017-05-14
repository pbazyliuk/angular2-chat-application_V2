import { NgModule } from '@angular/core';
// import { SharedModule }  from '../shared';
import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list';
import { ChatDetailsComponent } from './chat-details';
import { ChatNavbarComponent } from './chat-navbar/chat-navbar.component';
import { MessagesNavbarComponent } from './main-part-chat/messages-navbar/messages-navbar.component';
import { MessagesListComponent } from './main-part-chat/messages-list/messages-list.component';
import { MessageInputComponent } from './main-part-chat/message-input/message-input.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { MainPartChatComponent } from './main-part-chat/main-part-chat.component';
import { PrivatePartChatComponent } from './private-part-chat/private-part-chat.component';
import { ChatsRoutingModule } from "app/chat/chat-routing.module";
import { PrivateMessageListComponent } from './private-part-chat/private-message-list/private-message-list.component';
import { PrivateMessageNavbarComponent } from './private-part-chat/private-message-navbar/private-message-navbar.component';
import { PrivateMessageInputComponent } from './private-part-chat/private-message-input/private-message-input.component';
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
    UserListComponent,
    ChatDetailsComponent,
    ChatNavbarComponent,
    MessagesNavbarComponent,
    MessagesListComponent,
    MessageInputComponent,
    ChatMenuComponent,
    ChatListComponent,
    MainPartChatComponent,
    PrivatePartChatComponent,
    
    PrivateMessageListComponent,
    PrivateMessageNavbarComponent,
    PrivateMessageInputComponent,
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
    CommonModule,
    FormsModule,
    ChatsRoutingModule
    // SharedModule,
    // MessagesSharedModule,
    // ChatRoutingModule
  ],
  providers: [] //ChatService
})

export class ChatModule {}
