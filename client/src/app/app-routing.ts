//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

//Components
// import { LoginComponent } from "./auth/login";
import { HomeComponent } from "./home";
import { PageNotFoundComponent } from "./page-not-found";
// import { RegisterComponent } from "./auth/register";
import { ChatsComponent } from "./chats";

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
    path: 'chat',
    component: ChatsComponent    
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
    
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
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