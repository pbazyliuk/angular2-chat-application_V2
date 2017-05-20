import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home';
import { PageNotFoundComponent } from './page-not-found';
import { AuthGuard } from './auth';
import { ChatGuard } from './chat';
import { ProfileComponent } from 'app/profile/profile.component';

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
    loadChildren: '../app/chat/chat.module#ChatModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
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
