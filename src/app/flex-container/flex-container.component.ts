import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-container',
  templateUrl: './flex-container.component.html',
  styleUrls: ['./flex-container.component.scss'],
})
export class FlexContainerComponent implements OnInit {
  @Input() min: number = 1;
  @Input() breaks: string[] = [];
  private styles?: CSSStyleDeclaration;

  constructor(private elRef: ElementRef) { }

  @HostBinding('style.minHeight')
  get minHeight(): string { return `${this.min}%`; }

  @HostBinding('style.minWidth')
  get minWidth(): string { return `${this.min}%`; }

  public switch(bp: string): void {
    if (this.breaks.includes(bp)) {
      const tmp = { ...this.elRef.nativeElement.style };
      this.elRef.nativeElement.style.height = this.styles?.height;
      this.elRef.nativeElement.style.width = this.styles?.width;
      this.styles = tmp;
    }
  }

  public reset(): void {
    this.elRef.nativeElement.style.height = '';
    this.elRef.nativeElement.style.width = '';
  }

  ngOnInit(): void {
    this.styles = { ...this.elRef.nativeElement.style };
  }
}
