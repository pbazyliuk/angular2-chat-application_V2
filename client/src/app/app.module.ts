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
import { ThreadsService } from './core/';

import { StoreModule } from '@ngrx/store';
import { INITIAL_APPLICATION_STATE, ApplicationState } from "app/store/application-state";
import { Action } from "@ngrx/store";
import { LOAD_USER_THREADS_ACTION, LoadUserThreadsAction } from "app/store/actions";

import * as _ from 'lodash';
// import { ChatListComponent } from './chat/chat-list/chat-list.component';
// import { ChatDetailsComponent } from './chat/chat-details/chat-details.component';

function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action): ApplicationState {
  switch(action.type) {
    case LOAD_USER_THREADS_ACTION:
      return handleLoadUserThreadsAction(state, action);
  default: 
    return state;
  }
}

function handleLoadUserThreadsAction(state: ApplicationState, action: LoadUserThreadsAction): ApplicationState {
  const userData = action.payload;

  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = {
    participants: _.keyBy(action.payload.participants, 'id'),
    threads: _.keyBy(action.payload.threads, 'id'),
    messages: _.keyBy(action.payload.messages, 'id')
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
    // RegisterComponent,
    // ChatComponent,
    // ChatListComponent,
    // ChatDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    ChatModule,
      StoreModule.provideStore(storeReducer)
  ],
  providers: [LoginService, AuthGuard, ChatGuard, AuthService, ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
