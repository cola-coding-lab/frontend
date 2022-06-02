import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { validFileExtensionRegex } from '../../../file/file.model';
import { AddFileResult, AddFileType } from './add-file.model';

@Component({
  selector: 'explorer-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: [ './add-file.component.scss' ],
})
export class AddFileComponent implements OnInit {
  filename: string = '';
  @ViewChild('input', { static: true }) inputRef!: ElementRef;
  @Input() type: AddFileType = 'file';
  @Input() paddingLeft = '0';

  @Output() onAddFileSave: EventEmitter<AddFileResult> = new EventEmitter<AddFileResult>();
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
    if (this.type === 'file' && !validFileExtensionRegex.test(this.filename)) { this.filename += `.js`; }
    this.onAddFileSave.emit({
      type: this.type,
      name: this.filename,
    });
  }

  @HostListener('document:mousedown', [ '$event' ])
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
