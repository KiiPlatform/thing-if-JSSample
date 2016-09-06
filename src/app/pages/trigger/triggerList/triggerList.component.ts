import {Component, Input, Output, EventEmitter} from '@angular/core';
import { UiSwitchComponent } from 'angular2-ui-switch';
import {RGB, TurnPowerAction, ChangeColorAction} from '../../../pages/smartlight'
import {Trigger, Command, ServerCode, Predicate, StatePredicate, Condition, Equals} from 'thing-if-sdk'
export enum TriggerType {
    Command = 1,
    ServerCode = 2
}

export class TriggerRow {
    rgb: RGB = new RGB()
    power: boolean = false
    conditionPower = false
    triggerID: string
    triggerType: TriggerType = TriggerType.Command
    private enabledStatus = false
    rowStatus = false
    title: string = 'No Title'
    endpoint: string
    commandTarget: string
    constructor(trigger?: Trigger) {
        if (trigger == null) {
            return
        }
        this.triggerID = trigger.triggerID;
        this.triggerType = trigger.serverCode === null ? TriggerType.Command : TriggerType.ServerCode
        this.enabledStatus = !trigger.disabled
        this.rowStatus = !trigger.disabled
        let predicate = trigger.predicate as StatePredicate
        let condition: Condition = predicate.condition
        let eq: Equals = condition.clause as Equals
        this.conditionPower = eq.value as boolean
        if (trigger.title != null) {
            this.title = trigger.title
        }
        if (trigger.command != null) {

            let turnOn = trigger.command.actions[0] as TurnPowerAction
            if (turnOn.turnPower) {
                this.power = turnOn.turnPower.power
            }

            let colors = trigger.command.actions[1] as ChangeColorAction
            if (colors.changeColor) {
                this.rgb.red = colors.changeColor.color[0]
                this.rgb.green = colors.changeColor.color[1]
                this.rgb.blue = colors.changeColor.color[2]
            }
            this.commandTarget = trigger.command.targetID.id

        } else if (trigger.serverCode != null) {
            this.endpoint = trigger.serverCode.endpoint
        }


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
    statusChanged(item: TriggerRow) {
        this.changeTriggerStatus.emit(item);
    }
    updateClicked(item: TriggerRow) {
        this.updateTrigger.emit(item);
    }
    deleteClicked(item: TriggerRow) {
        this.deleteTrigger.emit(item);
    }
    //(click)="updateClicked(item)"
}