import { Directive, ElementRef, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective implements OnChanges {
  @Input()
  appHighlight = '#ffb6c1'; 
  
  @Input()
  bolder = false;

  @Output()
  colorUpdated = new EventEmitter()

  constructor(private elementRef: ElementRef) {
    this.updateBackGroundColor()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlight']) { this.updateBackGroundColor() }
    if (changes['bolder']) { this.updateFontWeight() }
  }

  updateBackGroundColor() {
    this.elementRef.nativeElement.style.backgroundColor = this.appHighlight || '#b3cde0';
    this.colorUpdated.emit();
  }
  
  updateFontWeight() {
    this.elementRef.nativeElement.style.fontWeight = this.bolder ? 'bolder' : 'normal';
  }
  
  onColorUpdated() {
    console.log('Se actualizó el color de fondo');
  }  
}