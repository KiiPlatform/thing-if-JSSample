import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Power',
        stats: 'ON',
        icon: 'bulb',
        percent: 100
      }, {
        color: pieColor,
        description: 'Red',
        stats: '10',
        icon: 'tango-rgb',
        percent: 10
      }, {
        color: pieColor,
        description: 'Green',
        stats: '178,391',
        icon: 'tango-rgb',
        percent: 15
      }, {
        color: pieColor,
        description: 'Blue',
        stats: '32,592',
        icon: 'tango-rgb',
        percent: 15
      }
    ];
  }
}
