import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { PageNotFoundComponent } from './page-not-found';
import { RegisterComponent } from './register';
import { LoginService } from "./login";
import { ChatsComponent } from './chats';

import { CoreModule } from './core';



@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // HeaderComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    ChatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
