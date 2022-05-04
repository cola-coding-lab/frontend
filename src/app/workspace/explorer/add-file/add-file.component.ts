import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditorFile, getFileType, validFileExtensionRegex } from '../../../file/file.model';
import { AddFileType } from './add-file.model';

@Component({
  selector: 'explorer-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent implements OnInit {
  filename: string = '';
  @ViewChild('input', { static: true }) inputRef!: ElementRef;
  @Input() type: AddFileType = 'file';
  @Input() paddingLeft = '0';

  @Output() onAddFileSave: EventEmitter<EditorFile> = new EventEmitter<EditorFile>();
  @Output() onAddFileAbort: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.inputRef.nativeElement.focus();
  }

  save($event?: MouseEvent): void {
    if (this.filename === '') {
      alert('pleaser enter filename');
      return;
    }
    if (this.type === 'file') {
      /*if (validFileExtensionRegex.test(this.filename)) {
        this.onAddFileSave.emit({
          name: this.filename,
          type: getFileType(this.filename, 'text/javascript'),
          content: '',
        });
      } else {
        this.filename += `.js`;
        this.onAddFileSave.emit({ name: this.filename, type: 'text/javascript', content: '' });
      }*/
    }
    if (this.type === 'directory') {
      /*this.onAddFileSave.emit({ name: this.filename, type: 'directory', children: [], content: '' });*/
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

  onKeyDown($event: KeyboardEvent) {
    switch ($event.key) {
      case 'Enter':
        this.save();
        break;
      case 'Escape':
        this.onAddFileAbort.emit();
        break;
      default:
        break;
    }
  }
}
