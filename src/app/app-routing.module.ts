import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGridComponent } from './dashboard-grid/dashboard-grid.component';

const routes: Routes = [
  { path: 'grid/:UserId', component: DashboardGridComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})



export class AppRoutingModule { }
