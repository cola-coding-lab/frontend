import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({template: ''})
export abstract class ComputedComponent {
  @ViewChild('computed', { static: true }) element!: ElementRef;

  protected get height(): number {
    return this.element.nativeElement.clientHeight;
  }

  protected get width(): number {
    return this.element.nativeElement.clientWidth;
  }
}