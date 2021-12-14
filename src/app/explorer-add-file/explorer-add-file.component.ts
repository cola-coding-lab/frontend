import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditorFile, getFileType, validFileExtensionRegex } from '../file/file.service';
import { AddFileType } from './explorer-add-file.model';

@Component({
  selector: 'app-explorer-add-file',
  templateUrl: './explorer-add-file.component.html',
  styleUrls: ['./explorer-add-file.component.scss'],
})
export class ExplorerAddFileComponent implements OnInit {
  filename: string = '';
  @ViewChild('input', { static: true }) inputRef!: ElementRef;
  @Input() type: AddFileType = 'file';

  @Output() onAddFileSave: EventEmitter<EditorFile> = new EventEmitter<EditorFile>();
  @Output() onAddFileAbort: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.inputRef.nativeElement.focus();
  }

  save($event: MouseEvent): void {
    if (this.filename === '') {
      alert('pleaser enter filename');
      return;
    }
    if (this.type === 'file') {
      if (validFileExtensionRegex.test(this.filename)) {
        this.onAddFileSave.emit({
          name: this.filename,
          type: getFileType(this.filename, 'text/javascript'),
          content: '',
        });
      } else {
        this.filename += `.js`;
        this.onAddFileSave.emit({ name: this.filename, type: 'text/javascript', content: '' });
      }
    }
    if (this.type === 'directory') {
      this.onAddFileSave.emit({ name: this.filename, type: 'directory', children: [] });
    }
  }

  @HostListener('document:mousedown', ['$event'])
  abort($event: MouseEvent): void {
    const target = $event.target as HTMLElement;
    if (!(this.elRef.nativeElement as HTMLElement).contains(target)
      || target.getAttribute('type') === 'reset') {
      this.onAddFileAbort.emit();
    }
  }
}
