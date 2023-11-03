import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { MaterialExampleModule } from '../material.module';
//import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { DashboardGridComponent } from './dashboard-grid/dashboard-grid.component';
import { PriorityChartComponent } from './priority-chart/priority-chart.component';
import { MonthlyFlagsChartComponent } from './monthly-flags-chart/monthly-flags-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
//import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { AnalystSearchComponent } from './analyst-search/analyst-search.component';
import { TileCardComponent } from './dashboard-grid/tile-card/tile-card.component';
import { FlagDisplaySupportComponent } from './flag-display-support/flag-display-support.component';
import { AvatarSupportComponent } from './avatar-support/avatar-support.component';
import { CommonService } from './services/image-support';
import { RouteSelectionComponent } from './route-selection/route-selection.component';
import { MockService } from './services/tiles-mock-api'

@NgModule({
  declarations: [
    AppComponent,
    DashboardGridComponent,
    PriorityChartComponent,
    AnalystSearchComponent,
    MonthlyFlagsChartComponent,
    TileCardComponent,
    FlagDisplaySupportComponent,
    AvatarSupportComponent,
    RouteSelectionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialExampleModule,
    GridsterModule,
    BrowserAnimationsModule,
    NgSelectModule,
    AppRoutingModule,
    HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],

  providers: [CommonService, MockService],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
