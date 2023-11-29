import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
//import { MaterialExampleModule } from '../material.module';
//import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { DashboardGridComponent } from './dashboard-grid/dashboard-grid.component';
import { PriorityChartComponent } from './priority-chart/priority-chart.component';
import { MonthlyFlagsChartComponent } from './monthly-flags-chart/monthly-flags-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { TileCardComponent } from './dashboard-grid/tile-card/tile-card.component';
//import { FlagDisplaySupportComponent } from './flag-display-support/flag-display-support.component';
import { FlagsDashboardDotNetWrapper } from './api/Flags-dashboard-Interface';
import { DashboardTilesAPIComponent } from './api/dashboard-api.service';
//import { BidPriceAspNetService } from "./api/au-visualization.service";
import { AnalystSearchComponent } from '../app/analyst-search/analyst-search.component';
import { AuthenticationService } from './services/authentication.service';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    DashboardGridComponent,
    PriorityChartComponent,
    MonthlyFlagsChartComponent,
    TileCardComponent,
    AnalystSearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DragDropModule,
    //MaterialExampleModule,
    GridsterModule,
    BrowserAnimationsModule,
    NgSelectModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],

  providers: [FlagsDashboardDotNetWrapper, DashboardTilesAPIComponent, AuthenticationService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
