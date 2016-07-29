import {Injectable} from '@angular/core';

@Injectable()
export class TriggerService {

  private _triggerList = [
    { text: 'Check me out' },

  ];

  getStateList() {
    return this._triggerList;
  }
}
