import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {kii} from '../../config';
import {CORE_DIRECTIVES} from '@angular/common';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {Router} from '@angular/router';


@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  directives: [AlertComponent,CORE_DIRECTIVES],
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public alerts:Array<Object> = [
  ];

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder) {
    kii.Kii.setLogging(true);
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }

  public onSubmit(values:Object):void {
    let mySelf = this;
    this.submitted = true;
    if (this.form.valid) {
      let username = this.email.value;
      let password = this.password.value;

      // Authenticate the user
      kii.KiiUser.authenticate(username, password).then(
        function(theUser) {
          console.log("success");
          window.location.href = '#/pages/dashboard';
        }
      ).catch(
        function(error) {
          let errorString = error.message;
          console.log("error :" + errorString);
          mySelf.alerts.push({msg: "error :" + errorString, type: 'danger', closable: true, dismissOnTimeout: 10});
        }
      );
    }
  }
}
