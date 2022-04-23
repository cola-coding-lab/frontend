import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { setPropertyFor } from '../../../../util/properties';
import { EditorFile } from '../../../file/file.model';
import { OpenTabsService } from './open-tabs.service';
import { OutputFilesService } from '../../output/output-files.service';
import { Codefile, MimeType } from '../../../welcome/workshops/codefile';

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

  constructor(
    private openTabsService: OpenTabsService,
    private outputFilesService: OutputFilesService,
  ) { }

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

  public get displayTabs(): boolean {
    return this.showTabsAlways || this.openTabs.length > 1;
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

  public play(): void {
    const files = this.openTabs.map<Codefile>((ef: EditorFile) => {
      return { name: ef.name, type: ef.type as MimeType, content: ef.content || '' };
    });
    this.outputFilesService.update(files);
  }

  private setTabsHeight() {
    if (this.tabsElement?.nativeElement?.parentElement) {
      const height = this.runElement?.nativeElement
        ? this.tabsElement.nativeElement.clientHeight + this.runElement.nativeElement.clientHeight
        : this.tabsElement.nativeElement.clientHeight;
      setPropertyFor(this.tabsElement.nativeElement.parentElement, 'tabs-height', height);
    }
  }

  public stop(): void {
    this.outputFilesService.clear();
  }
}
