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
import { ChatsComponent } from './chats';

import { CoreModule } from './core';



@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // HeaderComponent,
    HomeComponent,
    // LoginComponent,
    PageNotFoundComponent,
    // RegisterComponent,
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
