import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PathToAssets } from './dashboard-constants';
import { SortTileOptionsService } from './services/sort-tiles-options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {

  title = 'rm-flag-dashboard-ng';
  public isNdoChecked = true;
  public isThemeChange = true;
  public pathToAssets = PathToAssets;
  public chartThemeSelect = 'dark';



  constructor(public sortTileOptionsService: SortTileOptionsService) { }

  public ngOnInit(): void { }
}
