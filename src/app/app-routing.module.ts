import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlagDisplaySupportComponent } from './flag-display-support/flag-display-support.component';
import { AvatarSupportComponent } from './avatar-support/avatar-support.component';

const routes: Routes = [
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },
  { path: 'start-page', component: FlagDisplaySupportComponent },
  { path: 'avatar-screen', component: AvatarSupportComponent }
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
