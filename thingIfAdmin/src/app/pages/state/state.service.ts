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
  private _stateList = [
    { text: 'Check me out' },
    { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
    { text: 'Ex has semper alterum, expetenda dignissim' },
    { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
    { text: 'Simul erroribus ad usu' },
    { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
    { text: 'Get in touch with akveo team' },
    { text: 'Write email to business cat' },
    { text: 'Have fun with blur admin' },
    { text: 'What do you think?' },
  ];
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
  getStateList() {
    return this._stateList;
  }
}
