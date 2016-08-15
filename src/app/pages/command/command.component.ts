
/// <reference path="../../../../typings/modules/thing-if-sdk/index.d.ts" />
import {Component, ViewEncapsulation, NgZone} from '@angular/core';
import {BaCard} from '../../theme/components';
import {AppManager} from '../../app.manager';
import {OnboardingResult, MqttEndpoint} from 'thing-if-sdk';
import {Slider, SliderValueChange} from '../../../jquery/slider.component'
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {CommandService} from './command.service';
import { UiSwitchComponent } from 'angular2-ui-switch';
import {RGB,Smartlight} from '../../pages/smartlight'

@Component({
  selector: 'command',
  pipes: [],
  directives: [BaCard, Slider, AlertComponent,UiSwitchComponent,Smartlight],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./command.scss')],
  template: require('./command.html'),
  providers: [CommandService]
})
export class Command {
  power = false

  public alerts: Array<Object> = [
  ];

  rgb = new RGB()

  
  constructor(private _zone: NgZone, private _service: CommandService) {

  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }
  sendCommand() {
    this._service.sendCommand(this.power,this.rgb)
      .then(
      (res) => {
        this.showAlert('', false);
      }
      ).catch(
      (error) => {
        this.showAlert(error, true);
      }
      )

  }
  showAlert(message: any, isError: boolean) {
    this._zone.run(() => {
      this.alerts.push({ msg: isError ? "error :" : "Command Sent" + message, type: isError ? 'danger' : 'success', closable: true, dismissOnTimeout: 10 });
    })
  }


}