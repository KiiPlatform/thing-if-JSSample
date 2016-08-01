/// <reference path="../../../../typings/modules/thing-if-sdk/index.d.ts" />
import {Component, ViewEncapsulation} from '@angular/core';

import {PieChart} from './pieChart';
import {BaCard} from '../../theme/components';
import {AppManager} from '../../app.manager';
import {OnboardingResult, MqttEndpoint} from 'thing-if-sdk';

@Component({
  selector: 'dashboard',
  pipes: [],
  directives: [PieChart, BaCard],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
  
  accessToken : String = "accessToken"
  thingID : String = "Thing ID"

  mqttInstallationID: string = ""
  mqttHost: string = ""
  mqttTopic: string = ""
  mqttUsername: string = ""
  mqttPassword: string = ""
  mqttPortSSL: number = 0
  mqttPortTCP: number = 0
  mqttPortWS: number = 0
  mqttPortWSS: number = 0
  mqttTtl: number = 0

  constructor() {
    let manager = new AppManager()

    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      console.log("Access Token : "+manager.onboardingResult.accessToken);
      this.accessToken = manager.onboardingResult.accessToken;
      this.thingID = manager.onboardingResult.thingID;
      this.mqttInstallationID = manager.onboardingResult.mqttEndPoint.installationID;
      this.mqttHost = manager.onboardingResult.mqttEndPoint.host;
      this.mqttPassword = manager.onboardingResult.mqttEndPoint.password;
      this.mqttPortSSL = manager.onboardingResult.mqttEndPoint.portSSL;
      this.mqttPortTCP = manager.onboardingResult.mqttEndPoint.portTCP;
      this.mqttPortWS = manager.onboardingResult.mqttEndPoint.portWS;
      this.mqttPortWSS = manager.onboardingResult.mqttEndPoint.portWSS;
      this.mqttTopic = manager.onboardingResult.mqttEndPoint.mqttTopic;
      this.mqttTtl = manager.onboardingResult.mqttEndPoint.ttl;
      this.mqttUsername = manager.onboardingResult.mqttEndPoint.username;
    }
    
  }

}
