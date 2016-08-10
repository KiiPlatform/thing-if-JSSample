import {Component, ViewEncapsulation,ViewChild} from '@angular/core';
import {BaCard} from '../../theme/components';
import {TriggerService} from './trigger.service';
import {TriggerList,TriggerRow,TriggerType} from './triggerList'
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS,ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {RGB,Smartlight} from '../../pages/smartlight'

class TriggerAction {
  type : string
  row : TriggerRow
}

@Component({
  selector: 'trigger',
  encapsulation: ViewEncapsulation.None,
  providers: [BS_VIEW_PROVIDERS,TriggerService],
  styles: [require('./trigger.scss')],
  template: require('./trigger.html'),
  directives:[MODAL_DIRECTIVES,TriggerList,BaCard,Smartlight]
})
export class Trigger {
  conditionPower = false
  actionLabel : string
  actionLabelButton : string
  @ViewChild('commandTriggerModal') public commandModal: ModalDirective;
  @ViewChild('serverTriggerModal') public serverModal: ModalDirective;
  public alerts: Array<Object> = [
  ];

  rgb = new RGB()

  currentAction : TriggerAction = new TriggerAction()
  triggerData:Array<TriggerRow> =[];
  constructor(private _triggerService: TriggerService) {
    let dummyRow = new TriggerRow('id-command',TriggerType.Command,true);
    let dummyServerRow = new TriggerRow('id-server',TriggerType.ServerCode,false);
    this.triggerData.push(dummyRow)
    this.triggerData.push(dummyServerRow)

  }

  changePowerStatus(event : boolean){
    this.conditionPower = event
  }

  changeTriggerStatus(event : TriggerRow){
    console.log(event.rowStatus);
    this.currentAction.type = 'changeStatus'
    this.currentAction.row = event
  }
  updateTrigger(event : TriggerRow){
    console.log('update '+event.triggerType);

    this.currentAction.type = 'update'
    this.currentAction.row = event
    let isServerTrigger : boolean = event.triggerType === 2
    console.log('isServerTrigger '+ isServerTrigger);

    
    console.log('isServerTrigger '+ this.actionLabel);
    this.actionLabelButton = 'Update'
    if (isServerTrigger){
      this.actionLabel = "Update Server"
      this.serverModal.show()
    }else{
      this.actionLabel = "Update Command"
      this.commandModal.show()
    }

  }
  deleteTrigger(event : TriggerRow){
    console.log('delete '+event.triggerID);
    this.currentAction.type = 'delete'
    this.currentAction.row = event
  }

  newTrigger(){

  }

}
