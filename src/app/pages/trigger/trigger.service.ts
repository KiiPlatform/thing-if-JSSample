import {Injectable} from '@angular/core';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult, ThingIFAPI, QueryResult, Trigger, Command, TypedID, Types} from 'thing-if-sdk'
import {AppManager} from '../../app.manager';
import {kii} from '../../config';
import {RGB} from '../../pages/smartlight'
import {TriggerRow, TriggerType} from './triggerList'

export interface SimpleServerCode {
  endpoint: string
  parameters: Object
}

const ALARM: SimpleServerCode = { endpoint: 'setAlarm', parameters: { power: true } }
const NOTIFY: SimpleServerCode = { endpoint: 'sendNotification', parameters: { message: 'There is an intruder !!' } }


@Injectable()
export class TriggerService {
  deleteTrigger(triggerID: string): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = manager.getTargetID()
      return author.deleteTrigger(targetID, triggerID)
    } else {
      //dummy response
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
      //dummy response
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
      //dummy response
      return new Promise<any>((resolve) => {
        let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", true));
        let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
        let issuer = ThingIFSDK.TypedID.fromString("USER:myself");
        let target = ThingIFSDK.TypedID.fromString("THING:myself");
        const actions = [{ turnPower: { "power": true } }, { changeColor: { "color": [100, 255, 125] } }];
        const actions2 = [{ turnPower: { "power": true } }, { changeColor: { "color": [255, 0, 125] } }];
        let command = new Command(target, issuer, "smart-light", 1, actions)
        let command2 = new Command(target, issuer, "smart-light", 1, actions2)
        let serverCodeAlarm = new ThingIFSDK.ServerCode(ALARM.endpoint, null, null, ALARM.parameters);
        let serverCodeNotify = new ThingIFSDK.ServerCode(NOTIFY.endpoint, null, null, NOTIFY.parameters);
        let tr1 =Trigger.fromJson({
            predicate: statePredicate.toJson(),
            title: 'Trigger 1',
            triggerID: 'command-trigger-1',
            disabled: false
          })
          tr1.command = command
        let tr2 =Trigger.fromJson({
            predicate: statePredicate.toJson(),
            title: 'Trigger 2',
            triggerID: 'command-trigger-2',
            disabled: false
          })

          tr2.command = command2

        let triggers: Array<Trigger> = [
          tr1,
          tr2,
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

  saveCommandTrigger(conditionPower: boolean, rgb: RGB, power: boolean, triggerID?: string, commandTarget?: string): Promise<any> {
    const actions = [{ turnPower: { "power": power } }, { changeColor: { "color": rgb.toArray() } }];
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = manager.getTargetID()
      let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", conditionPower));
      let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
      let commandTargetID = null;
      if( commandTarget != null) {
        commandTargetID = new TypedID(Types.Thing, commandTarget);
      }
      let request = new ThingIFSDK.CommandTriggerRequest("smart-light", 1, actions, statePredicate,manager.issuer, commandTargetID);

      if (triggerID) {
        return author.patchCommandTrigger(targetID, triggerID, request)
      } else {
        return author.postCommandTrigger(targetID, request)
      }

    } else {
      //dummy response
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
      let serverCode = new ThingIFSDK.ServerCode(sc.endpoint, null, null, sc.parameters);
      let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", conditionPower));
      let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
      let request = new ThingIFSDK.ServerCodeTriggerRequest(serverCode, statePredicate);
      if (triggerID) {
        return author.patchServerCodeTrigger(targetID, triggerID, request)
      } else {
        return author.postServerCodeTrigger(targetID, request)
      }

    } else {
      //dummy response
      return new Promise<any>((resolve) => {
        if (triggerID) {
          resolve('new server trigger');
        } else {
          resolve('update server');
        }
      })
    }
  }

  crossThingTrigger(targetID: string):boolean{
    let manager = new AppManager();
    return manager.getTargetID().id !== targetID
  }



}
