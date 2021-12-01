import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;

  private resizeObserver: ResizeObserver;
  public onresize = false;

  constructor(private elRef: ElementRef) {
    this.resizeObserver = new ResizeObserver(_ => {
      console.log('resize');
      // this.iframe.nativeElement.style.disabled = 'disabled';
      // this.onresize = true;
      // setTimeout(() => {this.onresize = false}, 200);
    })
   }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.elRef.nativeElement.parentElement);
  }

  public onLoad(iframe: HTMLIFrameElement): void {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) { console.log(doc); }
  }
}
