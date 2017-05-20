import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PageNotFoundComponent } from './page-not-found';
import { LoginService } from './auth/shared/login.service';
import { CoreModule } from './core';
import { ChatModule } from './chat';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing';
import { AuthGuard } from './auth/';
import { ChatGuard } from './chat/';
import { AuthService } from './core/';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { INITIAL_APPLICATION_STATE } from 'app/store/application-state';
import { ProfileService } from 'app/profile/profile.service';
import { WsService } from 'app/ws.service';
import { ChatMenuService } from 'app/chat/chat-menu/chat-menu.service';
import { MessageInputService } from 'app/chat/main-part-chat/message-input/message-input.service';
import { ChatListService } from 'app/chat/chat-list/chat-list.service';
import { ChatsRoutingModule } from 'app/chat/chat-routing.module';
import { MainPartChatService } from 'app/chat/main-part-chat/main-part-chat.service';
import { UserListService } from './chat/user-list/user-list.service';
import { PrivateMessageInputService } from 'app/chat/private-part-chat/private-message-input/private-message-input.service';
import storeReducer from 'app/store/storeReducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    ChatModule,
      StoreModule.provideStore(storeReducer, INITIAL_APPLICATION_STATE)
  ],
  providers: [
    LoginService,
    AuthGuard,
    ChatGuard,
    AuthService,
    UserListService,
    ProfileService,
    WsService,
    ChatMenuService,
    MessageInputService,
    ChatListService,
    MainPartChatService,
    PrivateMessageInputService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
