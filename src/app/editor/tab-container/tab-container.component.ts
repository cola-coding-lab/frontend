import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { setPropertyFor } from '../../../util/properties';
import { EditorFile } from '../../file/file.model';
import { OpenTabsService } from './open-tabs.service';

@Component({
  selector: 'editor-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent implements OnInit {
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
    // this.fileService.current(
    //   file => {
    //     if (file && !this.openFiles.includes(file)) {
    //       this.openFiles.push(file);
    //     }
    //     if (file) { this.setCurrent(file); }
    //   },
    //   err => console.error(err),
    // );
  }

  public close(file: EditorFile): void {
    this.openTabsService.remove(file);
    /*
    this.openTabs = this.openTabs.filter(f => f !== file);
    file.isOpen = false;
    file.editor = undefined;
    if (this.openTabs.length > 0 && !this.openTabs.find(f => f.isOpen)) {
      this.openTabs[0].isOpen = true;
      this.file = this.openTabs[0];
    }
     */
  }

  public select(file: EditorFile): void {
    this.openTabsService.select(file);
    // this.file = file;
    // this.openTabs = this.openTabs.map(f => {
    //   f.isOpen = undefined;
    //   return f;
    // });
    // this.file.isOpen = true;
  }

  public tabId(file: EditorFile): string {
    return this.contentId(file) + '-tab';
  }

  public contentId(file: EditorFile): string {
    return file.name.replace('.', '_');
  }
}
