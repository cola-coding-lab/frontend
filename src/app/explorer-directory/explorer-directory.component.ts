import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ContextMenuClick } from '../context-menu/context-menu.model';
import { HasContextMenuComponent } from '../context-menu/has-context-menu.component';
import { EditorFile, FileService } from '../file/file.service';
import { CurrentSelectedService } from './current-selected.service';

interface ExplorerFile extends EditorFile {
  edit?: boolean;
}

@Component({
  selector: 'app-explorer-directory',
  templateUrl: './explorer-directory.component.html',
  styleUrls: ['./explorer-directory.component.scss'],
})
export class ExplorerDirectoryComponent extends HasContextMenuComponent<EditorFile> implements OnInit {
  @Input() children?: ExplorerFile[];
  @Input() root: boolean = false;
  @Input() collapse?: boolean = false;
  @Input() parent?: ExplorerFile;
  protected contextMenuItems = [
    {
      text: 'loeschen',
      event: 'delete',
    },
  ];
  private tmpName?: string;
  private activeFile?: EditorFile;

  constructor(
    private fileService: FileService,
    private currentSelectedService: CurrentSelectedService,
  ) { super(); }

  @ViewChild('editRef', { read: ElementRef }) set editRef(ref: ElementRef) {
    ref?.nativeElement?.focus();
  }

  ngOnInit(): void {
    this.currentSelectedService.currentSelected$(
      value => this.activeFile = value,
      err => console.error(err),
    );
  }

  isDirectory(file: EditorFile): boolean {
    return file.type === 'directory';
  }

  clicked($event: MouseEvent, child: EditorFile) {
    $event.stopPropagation();
    if (this.isDirectory(child)) {
      if (this.isActive(child)) {
        child.isOpen = !child.isOpen;
      }
    } else {
      this.fileService.select(child, this.parent);
    }
    this.currentSelectedService.currentSelected = child;
  }

  toggle($event: MouseEvent, child: EditorFile): void {
    $event.stopPropagation();
    if (this.isDirectory(child)) {
      child.isOpen = !child.isOpen;
    }
  }

  isActive(child: EditorFile) {
    return this.activeFile === child && child !== this.parent;
  }

  edit($event: MouseEvent, child: ExplorerFile) {
    $event.stopPropagation();
    child.edit = true;
  }

  delete($event: MouseEvent, child: EditorFile) {
    $event.stopPropagation();
    if (window.confirm(`will you ${child.name} delete?`)) {
      console.log('delete', child);
      // TODO...
    }
  }

  exitEdit($event: KeyboardEvent, child: ExplorerFile) {
    switch ($event.key) {
      case 'Escape':
        child.edit = undefined;
        break;
      case 'Enter':
        child.name = this.tmpName || child.name;
        this.tmpName = undefined;
        child.edit = undefined;
        break;
      default:
        break;
    }

    if ($event.key === 'Enter') {
      child.edit = undefined;
    }

  }

  changeName(value: string) {
    this.tmpName = value;
  }

  @HostListener('mousedown')
  closeEdit() {
    this.children?.forEach(child => {
      child.edit = undefined;
    });
  }

  protected onContextMenuItemClick($event: ContextMenuClick, data?: EditorFile): void {
    this.children = (this.children || []).filter(file => file !== data);
  }
}
