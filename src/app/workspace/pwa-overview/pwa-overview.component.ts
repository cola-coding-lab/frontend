import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProjectExplorerApiService } from '../project-explorer-api.service';
import { QrcodeModalComponent } from '../export/qrcode-modal/qrcode-modal.component';

export interface PwaOverview {
  url: string,
  title: string,
  description: string,
  created: string,
  modified: string,
}

@Component({
  selector: 'app-pwa-overview',
  templateUrl: './pwa-overview.component.html',
  styleUrls: [ './pwa-overview.component.scss' ],
})
export class PwaOverviewComponent implements OnInit {
  public overviews: PwaOverview[] = [];
  public pollTimes = [ 5, 20, 60 ];
  public isPolling: boolean = false;
  @ViewChild('pollTimer', { static: true }) pollTimer!: ElementRef<HTMLSelectElement>;
  public nextPoll: number = 0;
  private nextPollInterval?: number;
  private interval?: number;

  constructor(
    private readonly apiService: ProjectExplorerApiService,
    private readonly viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.pollOverview();
  }

  public show(overview: PwaOverview): void {
    const component = this.viewContainerRef.createComponent(QrcodeModalComponent);
    const modal = component.instance;
    modal.content = overview.url;
    modal.header = overview.title;
    modal.open();
  }

  updatePollTimer($event: Event) {
    const time = parseInt(($event.currentTarget as HTMLSelectElement).value || '60');
    this.setTimeout(time);
  }

  switch(poll: boolean) {
    this.isPolling = poll;
    if (this.isPolling) {
      console.log(this.pollTimer.nativeElement.value);
      this.setTimeout(parseInt(this.pollTimer.nativeElement.value));
    } else {
      console.log('stop polling');
      clearInterval(this.interval);
    }
  }

  private pollOverview(): void {
    const sub = this.apiService.pwaOverview$.subscribe(overviews => {
      this.overviews = overviews
        .map(ov => ({ ...ov, modified: new Date(ov.modified), created: new Date(ov.created) }))
        .sort((a, b) => (b.modified.getTime() - a.modified.getTime()))
        .map(ov => ({ ...ov, modified: ov.modified.toLocaleString(), created: ov.created.toLocaleString() }));
      sub.unsubscribe();
    });
  }

  private setTimeout(timeout: number): void {
    clearInterval(this.interval);
    clearInterval(this.nextPollInterval);
    const pollTimer = () => {
      this.nextPoll = timeout;
      this.nextPollInterval = setInterval(() => {
        this.nextPoll--;
        if (this.nextPoll <= 0) {
          clearInterval(this.nextPollInterval);
        }
      }, 1000);
    };
    pollTimer();
    console.log('start polling', timeout);
    this.interval = setInterval(() => {
      console.log('poll');
      this.pollOverview();
      pollTimer();
    }, (timeout * 1000) + 250);
  }
}
