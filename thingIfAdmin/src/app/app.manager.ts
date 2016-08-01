
/// <reference path="../../typings/modules/thing-if-sdk/index.d.ts" />
import {kii} from './config';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult} from 'thing-if-sdk'
export class AppManager {
    private static singleton: AppManager;
    public onboardingResult : OnboardingResult;
    
    constructor() {
        if (!AppManager.singleton) {
            AppManager.singleton = this;
        }
        return AppManager.singleton;
    }
    
}
