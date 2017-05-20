import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';
import { MainPartChatComponent } from 'app/chat/main-part-chat/main-part-chat.component';
import { PrivatePartChatComponent } from 'app/chat/private-part-chat/private-part-chat.component';

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

export class ChatsRoutingModule {}
