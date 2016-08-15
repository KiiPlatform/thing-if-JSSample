import {kii} from './config';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult, App, APIAuthor, TypedID, Types} from 'thing-if-sdk'
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
export class AppManager {
    private static singleton: AppManager;
    public onboardingResult: OnboardingResult;
    public apiAuthor: APIAuthor;
    public issuer :TypedID
    private _targetID: TypedID;
    public http : Http;
    constructor() {
        if (!AppManager.singleton) {
            AppManager.singleton = this;

        }
        return AppManager.singleton;
    }

    public getTargetID(): TypedID {
        if (!this._targetID && this.onboardingResult != null) {
            this._targetID = new TypedID(Types.Thing, this.onboardingResult.thingID);
        }
        return this._targetID;
    }

    public updateState() {
        if (this.onboardingResult == null) {
            return
        }
        let body = JSON.stringify(
        { "power": true, "rgb": [100,100,100] }
    )

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer '+ this.onboardingResult.accessToken);

    let url : string = this.apiAuthor.app.getThingIFBaseUrl() +'/targets/thing:'+this.onboardingResult.thingID+'/states';
    
    this.http.put(url, body,{
        headers: headers
      }).subscribe(
        data => { console.log(data); },
        err => { console.log(err); }
      );

    }
}
