import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { setPropertyFor } from '../../../../util/properties';
import { EditorFile } from '../../../file/file.model';
import { OpenTabsService } from './open-tabs.service';

@Component({
  selector: 'editor-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit {
  @Input() public isCloseable: boolean = true;
  public openTabs: EditorFile[] = [];
  public file?: EditorFile;

  constructor(private openTabsService: OpenTabsService) { }

  @ViewChild('tabs')
  public set tabs(tab: ElementRef) {
    if (tab?.nativeElement?.parentElement) {
      setPropertyFor(tab.nativeElement.parentElement, 'tabs-height', tab.nativeElement.clientHeight);
    }
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
}
