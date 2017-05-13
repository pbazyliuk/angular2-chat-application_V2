//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { ChatComponent } from './chat.component';
import { MainPartChatComponent } from "app/chat/main-part-chat/main-part-chat.component";
import { PrivatePartChatComponent } from "app/chat/private-part-chat/private-part-chat.component";
// import { PrivateMessagesListComponent } from "app/chat/private-messages-list/private-messages-list.component";
// import { MainChatContainerComponent } from "app/chat/main-chat-container/main-chat-container.component";
// import { ChatDetailsComponent } from './chat-details';
// import { ChatHolderComponent } from './chat-holder';
// import { ChatNewComponent } from './chat-new';

const chatRoutes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
        {
        path: '',
        component: MainPartChatComponent,
      },
      {
        path: ':id',
        component: PrivatePartChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chatRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class ChatsRoutingModule { }
