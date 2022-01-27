import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { timestamp } from 'src/util/datetime';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements AfterViewInit {
  private static readonly AUTOSCROLL_THRESHOLD = 15;

  @ViewChild('container', { static: true }) logFrame!: ElementRef;
  @ViewChildren('message') logElements!: QueryList<any>;
  public logs: any = [];

  private logContainer!: HTMLElement;
  private isNearBottom = true;

  constructor() { }

  ngAfterViewInit(): void {
    this.logContainer = this.logFrame.nativeElement;
    this.logElements.changes.subscribe(_ => this.onLogElementsChanged());
  }

  @HostListener('window:message', ['$event'])
  public onMessage(event: MessageEvent): void {
    if (event.data && event.data.source === 'iframe') {
      const { message, type } = event.data;
      this.logs.push({ message, type, timestamp: timestamp() });
    }
  }

  public scrolled($event: Event): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  private onLogElementsChanged(): void {
    if (this.isNearBottom) { this.scrollToBottom(); }
  }

  private scrollToBottom(): void {
    this.logContainer.scrollTo({
      top: this.logContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  private isUserNearBottom(): boolean {
    const position = this.logContainer.scrollTop + this.logContainer.offsetHeight;
    const height = this.logContainer.scrollHeight;
    return position >= height - LogComponent.AUTOSCROLL_THRESHOLD;
  }
}
