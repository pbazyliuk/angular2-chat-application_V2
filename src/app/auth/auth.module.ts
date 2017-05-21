import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthRoutingModule} from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltLoginGoogleComponent } from 'app/auth/alt-login-google/alt-login-google.component';

@NgModule({

  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AltLoginGoogleComponent,
  ],

  imports: [
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
  providers: []
})

export class AuthModule {}
