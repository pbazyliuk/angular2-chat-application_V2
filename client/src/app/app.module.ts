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
import { CommonModule } from "@angular/common";
import { StoreModule, Action } from "@ngrx/store";
import { INITIAL_APPLICATION_STATE, ApplicationState } from "app/store/application-state";
import { LOAD_CHAT_LIST_ACTION, LoadChatListActions, LOGIN_SUCCESS_ACTION, LOGOUT_SUCCESS_ACTION, REGISTER_SUCCESS_ACTION, UPDATE_PROFILE_SUCCESS_ACTION, MESSAGE_ADD_SUCCESS_ACTION, GET_ALL_MESSAGES_SUCCESS_ACTION, LOAD_CHATS_LIST_SUCCESS_ACTION, GET_ALL_PRIVATES_MESSAGES_SUCCESS_ACTION, ADD_PRIVATE_MESSAGE_SUCCESS_ACTION, UPDATE_CURRENT_CHAT_SUCCESS_ACTION } from "app/store/actions";
import { ProfileService } from "app/profile/profile.service";
import { WsService } from "app/ws.service";
import { ChatMenuService } from "app/chat/chat-menu/chat-menu.service";
import { MessageInputService } from "app/chat/main-part-chat/message-input/message-input.service";
import { ChatListService } from "app/chat/chat-list/chat-list.service";
import { ChatsRoutingModule } from "app/chat/chat-routing.module";
import { MainPartChatService } from "app/chat/main-part-chat/main-part-chat.service";
import { UserListService } from "./chat/user-list/user-list.service";
import { PrivateMessageInputService } from "app/chat/private-part-chat/private-message-input/private-message-input.service";

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
  
  case GET_ALL_MESSAGES_SUCCESS_ACTION:
    return handleGetAllMessagesSuccessAction(state, action);

  case LOAD_CHATS_LIST_SUCCESS_ACTION:
    return handleLoadChatsListActions(state, action);

  case GET_ALL_PRIVATES_MESSAGES_SUCCESS_ACTION:
    return handleGetAllPrivateMessagesActions(state, action);

  case ADD_PRIVATE_MESSAGE_SUCCESS_ACTION:
    return handleAddPrivateMessageActions(state, action);

  case UPDATE_CURRENT_CHAT_SUCCESS_ACTION:
    return handleUpdateCurrentChatActions(state, action);
  }

  
  return state;
}

function handleUpdateCurrentChatActions(state, action) {
  const currentChat = action.payload;

  const newState: ApplicationState = Object.assign({}, state);

  newState.uiState.currentChat = currentChat;

  return newState;
}

function handleAddPrivateMessageActions(state, action) {
  const privateMessage = action.payload;
  const chatname = privateMessage.chatname;
  delete privateMessage["chatname"];
  console.log('PRIVATE MESSAGE PAYLOAD', privateMessage)
  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData.chats.forEach((chat) => {
    console.log('CHATS', chat)
    if(chat["name"] === chatname) {
      console.log('CHATS FINDED', chat)
      chat.messageIds.push(privateMessage);
      console.log('CHATS FINDED AFTER', chat)
    }
  });

  return newState;
}

function handleGetAllPrivateMessagesActions(state, action) {
  const privateChatData = action.payload;
  console.log('PRIVATE CHATS PAYLOAD', privateChatData)
  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData.chats.forEach((chat) => {
    if(chat["name"] === privateChatData.name) {
      chat.messageIds = [...privateChatData.messageIds];
    }
  });

  return newState;
}


function handleLoadChatsListActions(state, action) {
  const chatsData = action.payload;
  console.log('CHATS PAYLOAD', chatsData)
  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData.chats = [...chatsData];

  return newState;
}

function handleGetAllMessagesSuccessAction(state, action) {
  const messagesData = action.payload;

  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData.messages = [...messagesData];

  return newState;
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
    usersOn: [action.payload.user],
    currentChat: ''
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
    usersOn: [],
    currentChat: ''
  }

  return newState;
}

function handleLoadChatListsAction(state: ApplicationState, action: LoadChatListActions) {//: ApplicationState 
  const userData = action.payload;
  console.log('CHATLIST SUCEESS', state);
  console.log(userData)

  let usersOn = [...userData.users];
  
  if(state.uiState.user) {
    usersOn
    .forEach(function(user, index) {
      for(var key in user) {
        if(key === 'email' && user['email'] === state.uiState.user.email) {
          user.isLogged = true;
        }
      }
    })
    usersOn = usersOn.filter(function(user) {
        if(user.isLogged === true) {
          return true;
        }
        return false;
      
    })
    console.log('AFTER FILTER', userData)
  }
  
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
    usersOn: [action.payload.user],
    currentChat: ''
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
  providers: [LoginService, AuthGuard, ChatGuard, AuthService, UserListService, ProfileService, WsService, ChatMenuService,
  MessageInputService, ChatListService, MainPartChatService, PrivateMessageInputService],
  bootstrap: [AppComponent]
})
export class AppModule { }
