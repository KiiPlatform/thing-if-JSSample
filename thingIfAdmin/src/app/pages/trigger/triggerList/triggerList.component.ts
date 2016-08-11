import {Component, Input, Output, EventEmitter} from '@angular/core';
import { UiSwitchComponent } from 'angular2-ui-switch';
import {RGB} from '../../../pages/smartlight'
export enum TriggerType {
    Command = 1,
    ServerCode = 2
}

export class TriggerRow {
    rgb : RGB = new RGB()
    power : boolean = false
    triggerID: string
    triggerType: TriggerType = TriggerType.Command
    private enabledStatus = false
    rowStatus = false
    constructor(id: string, type: TriggerType, status: boolean) {
        this.triggerID = id;
        this.triggerType = type;
        this.enabledStatus = status
        this.rowStatus = status
    }
    statusChange(event) {
        this.rowStatus = event
    }
    canChangeStatus(): boolean {
        return this.enabledStatus == this.rowStatus
    }
    getStatus() {
        return this.enabledStatus
    }
}

@Component({
    selector: 'trigger-list',
    template: require('./triggerList.html'),
    styles: [`
    .voffset  { margin-top: 2px; }
    .voffset1 { margin-top: 5px; }
    .voffset2 { margin-top: 10px; }
    .voffset3 { margin-top: 15px; }
    .voffset4 { margin-top: 30px; }
    .voffset5 { margin-top: 40px; }
    .voffset6 { margin-top: 60px; }
    .voffset7 { margin-top: 80px; }
    .voffset8 { margin-top: 100px; }
    .voffset9 { margin-top: 150px; }
    `
    ],
    directives: [UiSwitchComponent]
})
export class TriggerList {
    @Input() triggerData: Array<TriggerRow>;
    @Output() updateTrigger = new EventEmitter<TriggerRow>()
    @Output() deleteTrigger = new EventEmitter<TriggerRow>()
    @Output() changeTriggerStatus = new EventEmitter<TriggerRow>()
    constructor() {

    }
    statusChanged(item:TriggerRow){
        this.changeTriggerStatus.emit(item);
    }
    updateClicked(item:TriggerRow){
        this.updateTrigger.emit(item);
    }
    deleteClicked(item:TriggerRow){
        this.deleteTrigger.emit(item);
    }
    //(click)="updateClicked(item)"
}