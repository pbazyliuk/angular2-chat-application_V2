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


// import { ChatListComponent } from './chat/chat-list/chat-list.component';
// import { ChatDetailsComponent } from './chat/chat-details/chat-details.component';



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
    ChatModule
  ],
  providers: [LoginService, AuthGuard, ChatGuard, AuthService, ChatListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
