//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

//Components
// import { LoginComponent } from "./auth/login";
import { HomeComponent } from "./home";
import { PageNotFoundComponent } from "./page-not-found";
// import { RegisterComponent } from "./auth/register";
import { ChatComponent } from "./chat";

//Service
import { AuthGuard } from "./auth";
import { ChatGuard } from "./chat";
import { ProfileComponent } from "app/profile/profile.component";

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
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    //canActivate: [AuthGuard]
  },
  //   {
  //   path: 'chat',
  //   component: ChatComponent    
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
    //canActivate: [ChatGuard]
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