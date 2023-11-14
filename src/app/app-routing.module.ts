import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagDisplaySupportComponent } from './flag-display-support/flag-display-support.component';
import { AvataDetailsSupportComponent } from './avatar-details-support/avatar-details-support.component';

const routes: Routes = [

  { path: 'grid/:UserId', component: FlagDisplaySupportComponent },

  {
    path: 'profile',
    loadChildren: () =>
      import('./profile-component/profile.module').then((m) => m.ProfileModule),
  },

  { path: 'avatar-screen', component: AvataDetailsSupportComponent }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})



export class AppRoutingModule { }
