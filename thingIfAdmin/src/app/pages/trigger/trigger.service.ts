import {Injectable} from '@angular/core';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult, ThingIFAPI} from 'thing-if-sdk'
import {AppManager} from '../../app.manager';
import {kii} from '../../config';
import {RGB} from '../../pages/smartlight'
@Injectable()
export class TriggerService {

  listTriggers(): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {

      let author = manager.apiAuthor;

      let targetID = new ThingIFSDK.TypedID(ThingIFSDK.Types.Thing, "Thing ID for target");
      return author.listTriggers(targetID)
    } else {
      return new Promise<any>((resolve) => {
        resolve('dummy');
      })
    }
  }

  createCommandTrigger(conditionPower:boolean, rgb: RGB): Promise<any> {
    const actions = [{ turnPower: { "power": !conditionPower } }, { changeColor: { "color": rgb.toArray() } }]; 
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = new ThingIFSDK.TypedID(ThingIFSDK.Types.Thing, "Thing ID for target");
      let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", conditionPower));
      let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
      let request = new ThingIFSDK.CommandTriggerRequest("Smart Light", 1, [actions], statePredicate);
      return author.postCommandTrigger(targetID, request)
    } else {
      return new Promise<any>((resolve) => {
        resolve('dummy');
      })
    }
  }

  createServerCodeTrigger(): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = new ThingIFSDK.TypedID(ThingIFSDK.Types.Thing, "Thing ID for target");
      let serverCode = new ThingIFSDK.ServerCode("function_name", null, null, { param1: "hoge" });
      let condition = new ThingIFSDK.Condition(new ThingIFSDK.Equals("power", "false"));
      let statePredicate = new ThingIFSDK.StatePredicate(condition, ThingIFSDK.TriggersWhen.CONDITION_CHANGED);
      let request = new ThingIFSDK.ServerCodeTriggerRequest(serverCode, statePredicate);
      return author.postServerCodeTrigger(targetID, request)
    } else {
      return new Promise<any>((resolve) => {
        resolve('dummy');
      })
    }
  }

  updateCommandTrigger(): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = new ThingIFSDK.TypedID(ThingIFSDK.Types.Thing, "Thing ID for target");
      let request = new ThingIFSDK.CommandTriggerRequest("led2", 2, [{ setBrightness: { brightness: 50 } }]);
      author.patchCommandTrigger(targetID, "Trigger ID", request).then(function (trigger) {
        // Do something
      })
    } else {
      return new Promise<any>((resolve) => {
        resolve('dummy');
      })
    }
  }
  updateServercodeTrigger(): Promise<any> {
    let manager = new AppManager();
    if (manager.onboardingResult != null && manager.onboardingResult != undefined) {
      let author = manager.apiAuthor;
      let targetID = new ThingIFSDK.TypedID(ThingIFSDK.Types.Thing, "Thing ID for target");
      let serverCode = new ThingIFSDK.ServerCode("function_name", null, null, { param1: "hoge" });
      let request = new ThingIFSDK.ServerCodeTriggerRequest(serverCode, ThingIFSDK.ScheduleOncePredicate.fromJson({}));
      return author.patchServerCodeTrigger(targetID, "Trigger ID", request)
    } else {
      return new Promise<any>((resolve) => {
        resolve('dummy');
      })
    }
  }

}
