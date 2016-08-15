import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {kii} from '../../config';
import {CORE_DIRECTIVES} from '@angular/common';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {Router} from '@angular/router';
import * as ThingIFSDK from 'thing-if-sdk';
import {OnboardingResult,TypedID,Types} from 'thing-if-sdk'
import {AppManager} from '../../app.manager';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  directives: [AlertComponent, CORE_DIRECTIVES],
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public alerts: Array<Object> = [
  ];

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder, http:Http) {
    let manager = new AppManager()
    manager.http = http;
    kii.Kii.setLogging(true);
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    console.log('login');
    kii.KiiUser.logOut()
    
  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

  public onSubmit(values: Object): void {
    let mySelf = this;
    this.submitted = true;
    if (this.form.valid) {
      let username = this.email.value;
      let password = this.password.value;
      let manager = new AppManager();
      let ownerId : string;
      // Authenticate the user
      kii.KiiUser.authenticate(username, password).then(
        function (authedUser) {
          var token = authedUser.getAccessToken();
          ownerId = authedUser.getID();


          var apiAuthor = new ThingIFSDK.APIAuthor(
            token,
            new ThingIFSDK.App(
              kii.Kii.getAppID(),
              kii.Kii.getAppKey(),
              "https://api.kii.com")
          );
          manager.apiAuthor = apiAuthor;
          let type = ThingIFSDK.TypedID.fromString("USER:" + ownerId);
          manager.issuer = type
          let onboardRequest = new ThingIFSDK.OnboardWithVendorThingIDRequest("vendorthing-id", "password", type);
          return manager.apiAuthor.onboardWithVendorThingID(onboardRequest);
        }
      ).then(
        function (res: OnboardingResult) {

          console.log("onboarded:" + JSON.stringify(res));
          console.log("success");
          manager.onboardingResult = res;
          window.location.href = '#/pages/dashboard';
          manager.updateState();
          
        }
        ).catch(
        function (error) {
          let errorString = error.message;
          console.log("error :" + errorString);
          mySelf.alerts.push({ msg: "error :" + errorString, type: 'danger', closable: true, dismissOnTimeout: 10 });
        }
        );
    }
  }
}
