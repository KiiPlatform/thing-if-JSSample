import {Component, ViewEncapsulation} from '@angular/core';
import {BaThemeConfigProvider} from '../../theme';
import {PieChart} from './pieChart';
import {StateService} from './state.service';
import {BaCard} from '../../theme/components';
import {AppManager} from '../../app.manager';
import {OnboardingResult, MqttEndpoint} from 'thing-if-sdk';

@Component({
  selector: 'state',
  encapsulation: ViewEncapsulation.None,
  directives: [PieChart,BaCard],
  providers: [StateService],
  styles: [require('./state.scss')],
  template: require('./state.html')
})
export class State {
  
  public dashboardColors = this._baConfig.get().colors.dashboard;

  public stateList:Array<any>;
  public newStateText:string = '';

  constructor(private _baConfig:BaThemeConfigProvider, private _stateService:StateService) {
    this.stateList = this._stateService.getStateList();

    this.stateList.forEach((item) => {
      item.color = this._getRandomColor();
    });
  }

  getNotDeleted() {
    return this.stateList.filter((item:any) => {
      return !item.deleted
    })
  }

  addToDoItem($event) {

    if (($event.which === 1 || $event.which === 13) && this.newStateText.trim() != '') {

      this.stateList.unshift({
        text: this.newStateText,
        color: this._getRandomColor(),
      });
      this.newStateText = '';
    }
  }

  private _getRandomColor() {
    let colors = Object.keys(this.dashboardColors).map(key => this.dashboardColors[key]);

    var i = Math.floor(Math.random() * (colors.length - 1));
    return colors[i];
  }
}
