import {Injectable} from '@angular/core';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult} from 'thing-if-sdk'
import {AppManager} from '../../app.manager';
import {kii} from '../../config';
export class RGB {
  red: number = 0
  green: number = 0
  blue: number = 0
  toArray(){
    return [this.red,this.green,this.blue]
  }
}
@Injectable()
export class CommandService {
  constructor() {

  }

  sendCommand(power:boolean,rgb : RGB): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {

        const actions = [{ "turnPower": { "power": power }},{ "color": { "color": rgb.toArray() }}];
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

