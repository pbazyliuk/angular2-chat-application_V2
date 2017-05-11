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
import { LOAD_CHAT_LIST_ACTION, LoadChatListActions, LOGIN_SUCCESS_ACTION, LOGOUT_SUCCESS_ACTION, REGISTER_SUCCESS_ACTION, UPDATE_PROFILE_SUCCESS_ACTION, MESSAGE_ADD_SUCCESS_ACTION } from "app/store/actions";
import { ProfileService } from "app/profile/profile.service";
import { WsService } from "app/ws.service";

// import { ChatListComponent } from './chat/chat-list/chat-list.component';
// import { ChatDetailsComponent } from './chat/chat-details/chat-details.component';

function storeReducer(state: ApplicationState, action: Action): ApplicationState {
  switch (action.type) {
    case LOAD_CHAT_LIST_ACTION:
      return handleLoadChatListsAction(state, action);
  
  case LOGIN_SUCCESS_ACTION:
      return handleLoginSuccessAction(state, action);

  case LOGOUT_SUCCESS_ACTION:
      return handleLogoutSuccessAction(state, action);

   case REGISTER_SUCCESS_ACTION:
      return handleRegisterSuccessAction(state, action);

  case UPDATE_PROFILE_SUCCESS_ACTION:
    return handleUpdateProfileSuccessAction(state, action);
  
  case MESSAGE_ADD_SUCCESS_ACTION:
    return handleMessageAddSuccessAction(state, action);
  }
  return state;
}

function handleMessageAddSuccessAction(state, action) {
  const messageData = action.payload;

  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData.messages.push(messageData);

  return newState;
}

function handleUpdateProfileSuccessAction(state, action) {
  console.log("profile working")
   return state;
}

function handleRegisterSuccessAction(state, action) {
 const userData = action.payload;

  localStorage.setItem('token', userData.token);

  const newState: ApplicationState = Object.assign({}, state);

  newState.uiState = {
    user: action.payload.user,
    authenticated: true,
    usersOn: [action.payload.user]
  }

  return newState;
}

function handleLogoutSuccessAction(state: ApplicationState, action: LoadChatListActions): ApplicationState {
  // const userData = action.payload;

  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = {
    users: [],
    chats: [],
    messages: []
  };

  newState.uiState = {
    authenticated: undefined,
    user: undefined,
    usersOn: []
  }

  return newState;
}

function handleLoadChatListsAction(state: ApplicationState, action: LoadChatListActions) {//: ApplicationState 
  const userData = action.payload;
  console.log('CHATLIST SUCEESS', state);
  console.log(userData)

  let usersOn = [...userData.users];

  usersOn
    .forEach(function(user, index) {
      for(var key in user) {
        if(key === 'email' && user[key] === state.uiState.user.email) {
          user.isLogged = true;
          // console.log(user);
          // console.log(index)
        }
      }
    })
 console.log('AFTER FOREACH', userData)
  usersOn = usersOn.filter(function(user) {
    
      if(user.isLogged === true) {
        return true;
      }
      return false;
    
  })
  console.log('AFTER FILTER', userData)
  const newState: ApplicationState = Object.assign({}, state);


  
  newState.storeData.users = userData.users;
  newState.uiState.usersOn = usersOn;
  // this.Router.navigate(['chat'])
  return newState;
}

function handleLoginSuccessAction(state, action) {
  const userData = action.payload;
  
  

  localStorage.setItem('token', userData.token);
  

  const newState: ApplicationState = Object.assign({}, state);
console.log(state.storeData.users)
  newState.uiState = {
    user: action.payload.user,
    authenticated: true,
    usersOn: [action.payload.user]
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
  providers: [LoginService, AuthGuard, ChatGuard, AuthService, ChatListService, ProfileService, WsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
