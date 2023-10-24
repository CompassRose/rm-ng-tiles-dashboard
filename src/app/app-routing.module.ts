import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlagDisplaySupportComponent } from './flag-display-support/flag-display-support.component';
import { AvatarSupportComponent } from './avatar-support/avatar-support.component';
import { AvataDetailsSupportComponent } from './avatar-details-support/avatar-details-support.component';

const routes: Routes = [
  { path: '', redirectTo: 'start-page', pathMatch: 'full' },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile-component/profile.module').then((m) => m.ProfileModule),
  },
  { path: 'start-page', component: FlagDisplaySupportComponent },
  { path: 'avatar-screen', component: AvataDetailsSupportComponent }
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
