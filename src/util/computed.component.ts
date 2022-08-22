import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { setDocumentProperty } from './properties';

@Component({ template: '' })
export abstract class ComputedComponent implements AfterViewInit {
  @ViewChild('computed', { static: true }) element!: ElementRef;

  protected get height(): number {
    return this.element.nativeElement.clientHeight;
  }

  protected get width(): number {
    return this.element.nativeElement.clientWidth;
  }

  protected abstract get selectorPrefix(): string;

  ngAfterViewInit() {
    this.update();
  }

  private update(): void {
    setDocumentProperty(`${this.selectorPrefix}-height`, this.height);
    setDocumentProperty(`${this.selectorPrefix}-width`, this.width);
  }

  @HostListener('window:resize', [ '$event' ])
  private onResize(event: Event): void {
    this.update();
  }
}
