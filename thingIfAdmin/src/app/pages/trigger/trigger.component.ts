import {Component, ViewEncapsulation} from '@angular/core';
import {BaCard} from '../../theme/components';
import {TriggerService} from './trigger.service';
import {TriggerList,TriggerRow,TriggerType} from './triggerList'


@Component({
  selector: 'trigger',
  encapsulation: ViewEncapsulation.None,
  providers: [TriggerService],
  styles: [require('./trigger.scss')],
  template: require('./trigger.html'),
  directives:[TriggerList,BaCard]
})
export class Trigger {
  triggerData:Array<TriggerRow> =[];
  constructor(private _triggerService: TriggerService) {
    let dummyRow = new TriggerRow('id',TriggerType.Command,true);
    this.triggerData.push(dummyRow)

  }

  updateStatus(event : TriggerRow){

  }
  updateTrigger(event : TriggerRow){
    
  }
  updateDelete(event : TriggerRow){
    
  }


}
