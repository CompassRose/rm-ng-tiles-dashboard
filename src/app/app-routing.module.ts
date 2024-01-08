import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGridComponent } from './dashboard-grid/dashboard-grid.component';
import { TilesTimelineComponent } from './tiles-timeline/tiles-timeline.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { HeatmapTimelineComponent } from './timeline-heatmap/timeline-heatmap.component';
import { MonthlyAvailComponent } from './monthly-avail-chart/monthly-avail-chart.component';
import { DimensionalBarComponent } from './dimensional-bar-version/dimensional-bar-version.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [

  { path: 'grid/:UserId', component: AppLayoutComponent },
  { path: 'tiles-grid', component: DashboardGridComponent },
  // { path: 'timeline-component', component: TilesTimelineComponent },
  // { path: 'heatmap-component', component: HeatmapTimelineComponent },
  { path: 'market-study', component: MonthlyAvailComponent },
  { path: 'dimension-bar', component: DimensionalBarComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];



@NgModule({
  imports: [FormsModule, RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})



export class AppRoutingModule { }
