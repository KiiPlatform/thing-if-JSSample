
/// <reference path="../../../../typings/modules/thing-if-sdk/index.d.ts" />
import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {BaCard} from '../../theme/components';
import {AppManager} from '../../app.manager';
import {OnboardingResult, MqttEndpoint} from 'thing-if-sdk';
import {Slider, SliderValueChange} from '../../../jquery/slider.component'

import { UiSwitchComponent } from 'angular2-ui-switch';

export class RGB {
  red: number = 0
  green: number = 0
  blue: number = 0
  toArray() {
    return [this.red, this.green, this.blue]
  }
}
//{ turnPower: { "power": true } }, { changeColor: { "color": [100, 255, 125] }
export interface TurnPowerAction {
  turnPower: {
    "power": boolean
  }
}
export interface ChangeColorAction {
  changeColor: {
    "color": Array<number>
  }
}

@Component({
  selector: 'smartlight',
  directives: [BaCard, Slider, UiSwitchComponent],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./smartlight.scss')],
  template: require('./smartlight.html')
})
export class Smartlight {
  @Input() power = false

  @Input() rgb = new RGB()

  @Input() showRGB = true

  @Input() powerDisabled = false
  @Output() changePowerStatus = new EventEmitter<boolean>()
  onSwitchChange(event) {
    this.power = event
    this.changePowerStatus.emit(this.power);
  }
  sliderUpdated(event: SliderValueChange) {

    switch (event.sliderID) {
      case 'red':
        this.rgb.red = event.value;
        break;
      case 'green':
        this.rgb.green = event.value;
        break;
      case 'blue':
        this.rgb.blue = event.value;
        break;
      default:
        break;

    }
  }

}