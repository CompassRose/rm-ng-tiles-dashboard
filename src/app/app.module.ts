import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialExampleModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { DashboardGridComponent } from './dashboard-grid/dashboard-grid.component';
import { PriorityChartComponent } from './priority-chart/priority-chart.component';
import { MonthlyFlagsChartComponent } from './monthly-flags-chart/monthly-flags-chart.component';
import { NgSelectModule } from '@ng-select/ng-select';
//import { SortTileOptionsService } from './services/sort-tiles-options.service';
import { AnalystSearchComponent } from './analyst-search/analyst-search.component';
import { TileCardComponent } from './dashboard-grid/tile-card/tile-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardGridComponent,
    PriorityChartComponent,
    AnalystSearchComponent,
    MonthlyFlagsChartComponent,
    TileCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialExampleModule,
    GridsterModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],

  providers: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
