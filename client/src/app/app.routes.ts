//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

//Components
import { LoginComponent } from "app/login/login.component";
import { HomeComponent } from "app/home/home.component";
import { PageNotFoundComponent } from "app/page-not-found/page-not-found.component";
import { RegisterComponent } from "app/register/register.component";

//Service
// import { AuthGuard } from "./auth/auth.guard.service";
// import { ChatGuard } from "./chats/chat.guard.service";

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class AppRoutingModule {}