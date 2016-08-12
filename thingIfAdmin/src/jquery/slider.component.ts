
import {Component, ElementRef, Inject, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, SimpleChange}  from '@angular/core';
import "./jquery-ui.min";
export class SliderValueChange {
  sliderID: string
  value: number
  constructor(sliderID: string, value: number) {
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
  @Input() sliderID: string = 'id';
  @Output() valueChanged = new EventEmitter()
  private sliding = false


  constructor( @Inject(ElementRef) elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    this.elementRef = elementRef;
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if(this.sliding){
      return
    }
    let chng = changes['slideValue'];
    if (chng.currentValue  !== chng.previousValue ) {
      jQuery(this.elementRef.nativeElement).find("#slider").slider({ value: chng.currentValue });
    }

  }
  ngAfterContentInit(){
    console.log("ngAfterContentInit");
  }
  ngAfterViewInit() {
    let myself = this;
    jQuery(this.elementRef.nativeElement).find("#slider").slider({
      range: false,
      orientation: "horizontal",
      min: 0,
      max: 255,
      value: this.slideValue,
      create: function( event, ui ) {
        
      },
      slide: (event, ui) => {
        this.slideValue = ui.value;
        let change = new SliderValueChange(this.sliderID, this.slideValue)
        this.valueChanged.emit(change)
        
      },start: function( event, ui ) {
        myself.sliding =true
        
      },stop: function( event, ui ) {
        myself.sliding =false
        
      }
    });
    
  }

}