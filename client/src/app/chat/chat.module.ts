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
import { ChatsRoutingModule } from 'app/chat/chat-routing.module';
import { PrivateMessageListComponent } from './private-part-chat/private-message-list/private-message-list.component';
import { PrivateMessageNavbarComponent } from './private-part-chat/private-message-navbar/private-message-navbar.component';
import { PrivateMessageInputComponent } from './private-part-chat/private-message-input/private-message-input.component';
import { FilterUserByNamePipe } from 'app/chat/user-list/user-list-filter.pipe';
import { FilterChatByNamePipe } from 'app/chat/chat-list/chat-list-filter.pipe';
import { FilterMessageByTextPipe } from 'app/chat/main-part-chat/messages-list/messages-list-filter.pipe';
import { FilterPrivateMessageByTextPipe } from 'app/chat/private-part-chat/private-message-list/private-message-filter.pipe';
import { FilterUserOnByNamePipe } from 'app/chat/user-list/user-list-filterOn.pipe';

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
    FilterUserByNamePipe,
    FilterUserOnByNamePipe,
    FilterChatByNamePipe,
    FilterMessageByTextPipe,
    FilterPrivateMessageByTextPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatsRoutingModule
  ],
  providers: []
})

export class ChatModule {}

