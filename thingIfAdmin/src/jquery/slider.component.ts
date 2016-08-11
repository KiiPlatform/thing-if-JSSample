
import {Component, ElementRef ,Inject, AfterViewInit, ChangeDetectorRef, Input,Output,EventEmitter}  from '@angular/core';
import "./jquery-ui.min";
export class SliderValueChange{
  sliderID : string
  value : number
  constructor(sliderID : string, value : number){
    this.sliderID = sliderID
    this.value = value

  }
}
@Component({
    selector: 'slider',
    pipes: [],
    directives: [],
    template:    
    `
    <div id="slider"></div>
    `
})
export class Slider implements AfterViewInit {
    
    elementRef: ElementRef;
    @Input() slideValue: number = 0;
    @Input() sliderID : string = 'id';
    @Output() valueChanged = new EventEmitter()
    private first = true


    constructor(@Inject(ElementRef) elementRef: ElementRef, public cdr: ChangeDetectorRef) {
      this.elementRef = elementRef;
    }

    ngAfterViewInit() { 
      jQuery(this.elementRef.nativeElement).find("#slider").slider({
        range: false,
        orientation: "horizontal",
        min: 0,
        max: 255,
        value: this.slideValue,
        slide: ( event, ui ) => {
          this.slideValue = ui.value;
          let change = new SliderValueChange(this.sliderID,this.slideValue)
          this.valueChanged.emit(change)
        }
      });
    }
    ngAfterContentChecked() {
      if (this.slideValue > 0 && this.first){
        jQuery(this.elementRef.nativeElement).find("#slider").slider({value:this.slideValue});
        this.first = false
      }
      
    }
}