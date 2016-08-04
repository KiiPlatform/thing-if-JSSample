import {Component, ViewEncapsulation} from '@angular/core';
import {BaThemeConfigProvider} from '../../theme';
import {PieChart} from './pieChart';
import {StateService, SmartLightState} from './state.service';
import {BaCard} from '../../theme/components';
import {AppManager} from '../../app.manager';
import {OnboardingResult, MqttEndpoint} from 'thing-if-sdk';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

@Component({
  selector: 'state',
  encapsulation: ViewEncapsulation.None,
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, BaCard],
  providers: [StateService],
  styles: [require('./state.scss')],
  template: require('./state.html')
})
export class State {

  power = {
    description: 'Power',
    stats: 'ON',
    icon: 'bulb',
  }
  red = {
    description: 'Red',
    stats: 0,
  }
  green = {
    description: 'Green',
    stats: 0,
  }
  blue = {
    description: 'Blue',
    stats: 0,
  }


  constructor(private _stateService: StateService) {
    this._stateService.loadState().then((res: SmartLightState) => {
      this.pieChartData = res.rgb;
      this.red.stats = res.rgb[0] ;
      this.green.stats = res.rgb[1] ;
      this.blue.stats = res.rgb[2] ;
      this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    });
  }

  public pieChartType: string = 'pie';

  // Pie
  public pieChartLabels: string[] = ['Red', 'Green', 'Blue'];
  public backgroundColor: Array<any> = [
    { // red
      backgroundColor: ['rgba(255,0,0,0.8)', 'rgba(0,255,0,0.8)', 'rgba(0,0,255,0.8)'],
      borderColor: 'rgba(0,0,0,0)'
    }
  ];
  public pieChartData: number[] = [255, 255, 255];

  public randomizeType(): void {
    this._stateService.loadState().then((res: SmartLightState) => {
      this.pieChartData = res.rgb;

      this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    });


  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
