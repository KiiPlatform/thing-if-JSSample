import {Injectable} from '@angular/core';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult} from 'thing-if-sdk'
import {AppManager} from '../../app.manager';

export class SmartLightState {
  public power = true;
  public rgb = [100,200,255];
}
@Injectable()
export class StateService {
  constructor() {

  }

  loadState(): Promise<SmartLightState> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {

      return manager.apiAuthor.getState(manager.getTargetID());
    } else {
      return new Promise<SmartLightState>((resolve) => {
        let defaultState =  new SmartLightState();
        resolve(defaultState);
      })
    }

  }

}
