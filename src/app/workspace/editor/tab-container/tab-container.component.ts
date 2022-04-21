import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { setPropertyFor } from '../../../../util/properties';
import { EditorFile } from '../../../file/file.model';
import { OpenTabsService } from './open-tabs.service';

@Component({
  selector: 'editor-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: [ './tab-container.component.scss' ],
})
export class TabContainerComponent implements OnInit {
  @Input() public isCloseable: boolean = true;
  @Input() public showRunArea: boolean = false;
  @Input() public showTabsAlways: boolean = false;

  public openTabs: EditorFile[] = [];
  public file?: EditorFile;
  private tabsElement?: ElementRef;
  private runElement?: ElementRef;

  constructor(private openTabsService: OpenTabsService) { }

  @ViewChild('tabs')
  public set tabs(tab: ElementRef) {
    this.tabsElement = tab;
    this.setTabsHeight();
  }

  @ViewChild('run')
  public set run(run: ElementRef) {
    this.runElement = run;
    this.setTabsHeight();
  }

  ngOnInit(): void {
    this.openTabsService.subscribe(files => {
      this.openTabs = files;
    });
  }

  public close(file: EditorFile): void {
    this.openTabsService.remove(file);
  }

  public select(file: EditorFile): void {
    this.openTabsService.select(file);
  }

  public tabId(file: EditorFile): string {
    return this.contentId(file) + '-tab';
  }

  public contentId(file: EditorFile): string {
    return file.name.replace('.', '_');
  }

  public get displayTabs(): boolean {
    return this.showTabsAlways || this.openTabs.length > 1;
  }

  private setTabsHeight() {
    if (this.tabsElement?.nativeElement?.parentElement) {
      const height = this.runElement?.nativeElement
        ? this.tabsElement.nativeElement.clientHeight + this.runElement.nativeElement.clientHeight
        : this.tabsElement.nativeElement.clientHeight;
      setPropertyFor(this.tabsElement.nativeElement.parentElement, 'tabs-height', height);
    }
  }
}
