import {Component, ViewEncapsulation} from '@angular/core';
import {BaThemeConfigProvider} from '../../theme';

import {TriggerService} from './trigger.service';

@Component({
  selector: 'trigger',
  encapsulation: ViewEncapsulation.None,
  providers: [TriggerService],
  styles: [require('./trigger.scss')],
  template: require('./trigger.html')
})
export class Trigger {
  
  public dashboardColors = this._baConfig.get().colors.dashboard;

  public triggerList:Array<any>;
  public newStateText:string = '';

  constructor(private _baConfig:BaThemeConfigProvider, private _triggerService:TriggerService) {
    this.triggerList = this._triggerService.getStateList();

    this.triggerList.forEach((item) => {
      item.color = this._getRandomColor();
    });
  }

  getNotDeleted() {
    return this.triggerList.filter((item:any) => {
      return !item.deleted
    })
  }

  addToDoItem($event) {

    if (($event.which === 1 || $event.which === 13) && this.newStateText.trim() != '') {

      this.triggerList.unshift({
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
