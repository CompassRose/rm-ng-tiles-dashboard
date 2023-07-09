import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { MaterialExampleModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { NgForOf } from '@angular/common';
import { DashboardGridComponent } from './dashboard-grid/dashboard-grid.component';
import { PriorityChartComponent } from './priority-chart/priority-chart.component';
import { MonthlyFlagsChartComponent } from './monthly-flags-chart/monthly-flags-chart.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
//import { SortTileOptionsService } from './services/sort-tiles-options.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardGridComponent,
    PriorityChartComponent,
    MonthlyFlagsChartComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialExampleModule,
    GridsterModule,
    NgSelectModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
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
