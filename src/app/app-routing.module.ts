import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PicComponent} from './pic/pic.component' ;
import {AccountComponent} from './account/account.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { MainbarComponent } from './mainbar/mainbar.component';

const routes: Routes = [
  {path : 'pic' ,component: PicComponent},
  {path: 'acc' , component: AccountComponent},
  {path: 'log', component: LoginPageComponent},
  {path: 'reg' , component:RegisterComponent},
  {path: 'main' , component:MainbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
