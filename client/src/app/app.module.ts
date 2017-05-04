import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home';
// import { LoginComponent } from './auth/login';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing';
import { PageNotFoundComponent } from './page-not-found';
// import { RegisterComponent } from './auth/register';
import { LoginService } from "./auth/shared/login.service";
// import { ChatComponent } from './chat';

import { CoreModule } from './core';
import { ChatModule } from './chat';

import { AuthGuard } from './auth/';
import { ChatGuard } from './chat/';
import { AuthService } from './core/';
import { ProfileComponent } from './profile/profile.component';
import { ChatListService } from "app/chat/chat-list";
import { CommonModule } from "@angular/common";
import { StoreModule, Action } from "@ngrx/store";
import { INITIAL_APPLICATION_STATE, ApplicationState } from "app/store/application-state";
import { LOAD_CHAT_LIST_ACTION, LoadChatListActions } from "app/store/actions";

// import { ChatListComponent } from './chat/chat-list/chat-list.component';
// import { ChatDetailsComponent } from './chat/chat-details/chat-details.component';

function storeReducer(state: ApplicationState, action: Action): ApplicationState {
  switch (action.type) {
    case LOAD_CHAT_LIST_ACTION:
      return handleLoadChatListsAction(state, action);
  }
  return state;
}

function handleLoadChatListsAction(state: ApplicationState, action: LoadChatListActions): ApplicationState {
  const userData = action.payload;

  console.error('userData', userData);

  const newState: ApplicationState = Object.assign({}, state);


  newState.storeData = {
    users: action.payload.users,
    chats: [],
    messages: []
  }

  return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // HeaderComponent,
    HomeComponent,
    // LoginComponent,
    PageNotFoundComponent,
    ProfileComponent,
    // RegisterComponent,
    // ChatComponent,
    // ChatListComponent,
    // ChatDetailsComponent
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
  providers: [LoginService, AuthGuard, ChatGuard, AuthService, ChatListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
