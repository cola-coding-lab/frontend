import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;
  public onresize = false;
  private resizeObserver: ResizeObserver;

  constructor(private elRef: ElementRef) {
    this.resizeObserver = new ResizeObserver(_ => {
      console.log('resize ' + OutputComponent.name);
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.elRef.nativeElement.parentElement);
  }

  public onLoad(iframe: HTMLIFrameElement): void {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) { console.log(doc); }
  }
}
