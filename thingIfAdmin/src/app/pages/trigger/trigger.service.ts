import {Injectable} from '@angular/core';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult, ThingIFAPI, QueryResult, Trigger, Command} from 'thing-if-sdk'
import {AppManager} from '../../app.manager';
import {kii} from '../../config';
import {RGB} from '../../pages/smartlight'
import {TriggerRow, TriggerType} from './triggerList'

export interface SimpleServerCode {
  functionName: string
  param: Object
}

export const ALARM: SimpleServerCode = { functionName: 'setAlarm', param: { power: true } }
export const NOTIFY: SimpleServerCode = { functionName: 'sendNotification', param: { message: 'There is an intruder !!' } }


@Injectable()
export class TriggerService {
  deleteTrigger(triggerID: string): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = manager.getTargetID()
      return author.deleteTrigger(targetID, triggerID)
    } else {
      return new Promise<any>((resolve) => {
        resolve('deleted')
      })
    }
  }
  enableTrigger(triggerID: string, enabled: boolean): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = manager.getTargetID()
      return author.enableTrigger(targetID, triggerID, enabled)
    } else {
      return new Promise<any>((resolve) => {
        resolve('enabled');
      })
    }
  }

  listTriggers(): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {

      let author = manager.apiAuthor;

      let targetID = manager.getTargetID()
      return author.listTriggers(targetID)
    } else {
      return new Promise<any>((resolve) => {
        let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", true));
        let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
        let issuer = ThingIFSDK.TypedID.fromString("USER:myself");
        let target = ThingIFSDK.TypedID.fromString("THING:myself");
        const actions = [{ turnPower: { "power": true } }, { changeColor: { "color": [100, 255, 125] } }];
        let command = new Command(target, issuer, "smart-light", 1, actions)
        let serverCodeAlarm = new ThingIFSDK.ServerCode(ALARM.functionName, null, null, ALARM.param);
        let serverCodeNotify = new ThingIFSDK.ServerCode(NOTIFY.functionName, null, null, NOTIFY.param);
        let triggers: Array<Trigger> = [
          Trigger.fromJson({
            predicate: statePredicate.toJson(),
            title: 'Trigger 1',
            triggerID: 'command-trigger-1',
            disabled: false,
            command: command
          }),
          Trigger.fromJson({
            predicate: statePredicate.toJson(),
            title: 'Trigger 2',
            triggerID: 'server-trigger-1',
            disabled: false,
            serverCode: serverCodeAlarm
          }),
          Trigger.fromJson({
            predicate: statePredicate.toJson(),
            title: 'Trigger 3',
            triggerID: 'server-trigger-2',
            disabled: false,
            serverCode: serverCodeNotify
          })
        ]
        let res = new QueryResult<Trigger>(triggers)
        resolve(res);
      })
    }
  }

  saveCommandTrigger(conditionPower: boolean, rgb: RGB, power: boolean, triggerID?: string): Promise<any> {
    const actions = [{ turnPower: { "power": !conditionPower } }, { changeColor: { "color": rgb.toArray() } }];
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = manager.getTargetID()
      let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", conditionPower));
      let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
      let request = new ThingIFSDK.CommandTriggerRequest("smart-light", 1, actions, statePredicate);
      if (triggerID) {
        return author.patchCommandTrigger(targetID, triggerID, request)
      } else {
        return author.postCommandTrigger(targetID, request)
      }

    } else {

      return new Promise<any>((resolve) => {
        if (triggerID) {
          resolve('new command trigger');
        } else {
          resolve('update command');
        }
      })
    }
  }

  saveServerCodeTrigger(conditionPower: boolean, sc: SimpleServerCode, triggerID?: string): Promise<any> {
    let manager = new AppManager();

    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = manager.getTargetID()
      let serverCode = new ThingIFSDK.ServerCode(sc.functionName, null, null, sc.param);
      let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", conditionPower));
      let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
      let request = new ThingIFSDK.ServerCodeTriggerRequest(serverCode, statePredicate);
      if (triggerID) {
        return author.patchServerCodeTrigger(targetID, triggerID, request)
      } else {
        return author.postServerCodeTrigger(targetID, request)
      }

    } else {
      return new Promise<any>((resolve) => {
        if (triggerID) {
          resolve('new server trigger');
        } else {
          resolve('update server');
        }
      })
    }
  }



}
