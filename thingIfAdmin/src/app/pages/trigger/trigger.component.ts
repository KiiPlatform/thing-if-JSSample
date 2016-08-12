import {Component, ViewEncapsulation, ViewChild, NgZone} from '@angular/core';
import {BaCard} from '../../theme/components';
import {TriggerService, SimpleServerCode, ALARM, NOTIFY} from './trigger.service';
import {TriggerList, TriggerRow, TriggerType} from './triggerList'
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {RGB, Smartlight} from '../../pages/smartlight'
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {OnboardingResult, ThingIFAPI, QueryResult, Trigger, Command} from 'thing-if-sdk'
class TriggerAction {
  type: string
  row: TriggerRow = new TriggerRow()
}

@Component({
  selector: 'trigger',
  encapsulation: ViewEncapsulation.None,
  providers: [BS_VIEW_PROVIDERS, TriggerService],
  styles: [require('./trigger.scss')],
  template: require('./trigger.html'),
  directives: [MODAL_DIRECTIVES, TriggerList, BaCard, Smartlight, AlertComponent]
})
export class TriggerComponent {
  conditionPower = false
  selectedServercode: SimpleServerCode = ALARM
  actionLabel: string
  actionLabelButton: string
  @ViewChild('commandTriggerModal') public commandModal: ModalDirective;
  @ViewChild('serverTriggerModal') public serverModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('enabledModal') public enabledModal: ModalDirective;
  public alerts: Array<Object> = [
  ];
  power = true
  rgb = new RGB()
  endpoint = 'setAlarm'

  currentAction: TriggerAction = new TriggerAction()
  triggerData: Array<TriggerRow> = [];
  constructor(private _triggerService: TriggerService, private _zone: NgZone) {
    _triggerService.listTriggers().then((result: QueryResult<Trigger>) => {
      console.log(result);
      this.triggerData = result.results.map<TriggerRow>((value) => {
        return new TriggerRow(value)
      })
      console.log(result.results);

    }).catch(error => {
      console.log('error' + error);

    })



  }
  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }
  changePowerStatus(event: boolean) {
    this.power = event
  }
  changeConditionPowerStatus(event: boolean) {
    this.conditionPower = event
  }

  changeTriggerStatus(event: TriggerRow) {
    console.log(event.rowStatus);
    this.currentAction.type = 'changeStatus'
    this.currentAction.row = event
    this.actionLabel = "Change Trigger Status"
    this.enabledModal.show()
  }
  updateTrigger(event: TriggerRow) {


    this.currentAction.type = 'update'
    this.currentAction.row = event
    let isServerTrigger: boolean = event.triggerType === 2
    this.conditionPower = event.conditionPower
    
    

    this.actionLabelButton = 'Update'
    if (isServerTrigger) {
      this.actionLabel = "Update Server"
      this.endpoint = event.endpoint
      this.serverModal.show()
    } else {
      this.rgb = new RGB()
      this.rgb.red = event.rgb.red
      this.rgb.green = event.rgb.green
      this.rgb.blue = event.rgb.blue
      this.power = event.power
      this.actionLabel = "Update Command"
      this.commandModal.show()
    }

  }
  deleteTrigger(event: TriggerRow) {
    console.log('delete ' + event.triggerID);
    this.currentAction.type = 'delete'
    this.currentAction.row = event
    this.actionLabel = "Change Trigger Status"
    this.deleteModal.show()
  }

  newTrigger(isServer: boolean) {
    let type = isServer ? TriggerType.ServerCode : TriggerType.Command
    let newRow = new TriggerRow();
    newRow.triggerType = type
    this.currentAction.type = 'new'
    this.currentAction.row = newRow
    this.actionLabelButton = 'Create Trigger'
    if (isServer) {
      this.actionLabel = "New Server"
      this.serverModal.show()
    } else {
      this.actionLabel = "New Command"
      this.commandModal.show()
    }
  }

  proceed() {
    let promise: Promise<any>
    let row = this.currentAction.row
    let isServer = row.triggerType === TriggerType.ServerCode
    let service = this._triggerService
    let successMessage: string

    switch (this.currentAction.type) {
      case 'new':
        this.selectedServercode = this.endpoint == ALARM.endpoint ? ALARM : NOTIFY
        promise = isServer ?
          service.saveServerCodeTrigger(this.conditionPower, this.selectedServercode) :
          service.saveCommandTrigger(this.conditionPower, this.rgb, this.power)

        if (isServer) {
          this.serverModal.hide()
          successMessage = 'new Server Code Trigger is succeded'
        } else {
          this.commandModal.hide()
          successMessage = 'new Command Trigger is succeded'
        }
        break;
      case 'update':
        this.selectedServercode = this.endpoint == ALARM.endpoint ? ALARM : NOTIFY
        promise = isServer ?
          service.saveServerCodeTrigger(this.conditionPower, this.selectedServercode, row.triggerID) :
          service.saveCommandTrigger(this.conditionPower, this.rgb, this.power, row.triggerID)
        if (isServer) {
          this.serverModal.hide()
          successMessage = 'Server Code Trigger is updated'
        } else {
          this.commandModal.hide()
          successMessage = 'Command Trigger is updated'
        }
        break;
      case 'changeStatus':
        promise = service.enableTrigger(row.triggerID, row.rowStatus)
        this.enabledModal.hide()
        successMessage = 'Trigger is ' + row.rowStatus ? 'Enabled' : 'Disabled'
        break;
      case 'delete':
        promise = service.deleteTrigger(row.triggerID)
        successMessage = 'Trigger is deleted'
        this.deleteModal.hide()
        break;
      default:
        alert('error')
        break;

    }

    promise.then((result) => {
      console.log(result);

      return service.listTriggers()
    }).then((result: QueryResult<Trigger>) => {
      console.log(result);
      this._zone.run(() => {
        this.triggerData = result.results.map<TriggerRow>((value) => {
          return new TriggerRow(value)
        })

      })
      this.showAlert(successMessage, false)
      console.log(result.results);

    }).catch((error) => {
      this.showAlert(error, true)
    })
  }

  showAlert(message: any, isError: boolean) {
    this._zone.run(() => {
      this.alerts.push({ msg: isError ? "error :" : "" + message, type: isError ? 'danger' : 'success', closable: true, dismissOnTimeout: 10 });
    })
  }

}
