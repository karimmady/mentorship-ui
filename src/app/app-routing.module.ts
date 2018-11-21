import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuardService } from './Services/auth-guard.service';

import {UserProfileComponent} from './user-profile/user-profile.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin/questions',
    component: AdminQuestionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'user',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
