import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagDisplaySupportComponent } from './flag-display-support/flag-display-support.component';

const routes: Routes = [

  { path: 'grid/:UserId', component: FlagDisplaySupportComponent },
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})



export class AppRoutingModule { }
