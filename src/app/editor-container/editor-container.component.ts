import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { setPropertyFor } from '../../util/properties';
import { EditorFile, FileService } from '../file/file.service';

@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss'],
})
export class EditorContainerComponent implements OnInit {
  public openFiles: EditorFile[] = [];
  public file?: EditorFile;

  constructor(private fileService: FileService) { }

  @ViewChild('tabs')
  public set tabs(tab: ElementRef) {
    if (tab?.nativeElement?.parentElement) {
      setPropertyFor(tab.nativeElement.parentElement, 'tabs-height', tab.nativeElement.clientHeight);
    }
  }

  ngOnInit(): void {
    this.fileService.current(
      file => {
        if (file && !this.openFiles.includes(file)) {
          this.openFiles.push(file);
        }
        if (file) { this.setCurrent(file); }
      },
      err => console.error(err),
    );
  }

  public close(file: EditorFile): void {
    this.openFiles = this.openFiles.filter(f => f !== file);
    file.isOpen = false;
    file.editor = undefined;
    if (this.openFiles.length > 0 && !this.openFiles.find(f => f.isOpen)) {
      this.openFiles[0].isOpen = true;
      this.file = this.openFiles[0];
    }
  }

  public setCurrent(file: EditorFile): void {
    this.file = file;
    this.openFiles = this.openFiles.map(f => {
      f.isOpen = undefined;
      return f;
    });
    this.file.isOpen = true;
  }

  public tabId(file: EditorFile): string {
    return this.contentId(file) + '-tab';
  }

  public contentId(file: EditorFile): string {
    return file.name.replace('.', '_');
  }
}
