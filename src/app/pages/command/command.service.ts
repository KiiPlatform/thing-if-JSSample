import {Injectable} from '@angular/core';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult} from 'thing-if-sdk'
import {AppManager} from '../../app.manager';
import {kii} from '../../config';
import {RGB} from '../../pages/smartlight'

@Injectable()
export class CommandService {
  constructor() {

  }

  sendCommand(power: boolean, rgb: RGB): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {

      const actions = [{ turnPower: { "power": power } }, { changeColor: { "color": rgb.toArray() } }];
      const commandReq: ThingIFSDK.PostCommandRequest = new ThingIFSDK.PostCommandRequest("smart-light", 1, actions);
      commandReq.issuer = "USER:" + kii.KiiUser.getCurrentUser().getID();

      let author = manager.apiAuthor;

      return author.postNewCommand(manager.getTargetID(), commandReq);
    } else {
      return new Promise<any>((resolve) => {

        resolve('dummy');
      })
    }

  }

}

