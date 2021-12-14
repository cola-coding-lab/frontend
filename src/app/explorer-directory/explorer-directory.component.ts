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
    {
      text: 'umbenennen',
      event: 'rename',
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

  private static enableEdit(child: ExplorerFile): void {
    child.edit = true;
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

  clicked($event: MouseEvent, child: EditorFile): void {
    $event.stopPropagation();
    if (this.isDirectory(child) && this.isActive(child)) {
      this.toggleDirectoryIsOpen(child);
    } else {
      this.fileService.select(child, this.parent);
    }
    this.currentSelectedService.currentSelected = child;
  }

  toggle($event: MouseEvent, child: EditorFile): void {
    $event.stopPropagation();
    this.toggleDirectoryIsOpen(child);
  }

  isActive(child: EditorFile): boolean {
    return this.activeFile === child && child !== this.parent;
  }

  edit($event: MouseEvent, child: ExplorerFile): void {
    $event.stopPropagation();
    ExplorerDirectoryComponent.enableEdit(child);
  }

  delete($event: MouseEvent, child: EditorFile): void {
    $event.stopPropagation();
    if (window.confirm(`will you ${child.name} delete?`)) {
      this.deleteChild(child);
    }
  }

  exitEdit($event: KeyboardEvent, child: ExplorerFile): void {
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
  }

  updateFileName(fileName: string): void {
    this.tmpName = fileName;
  }

  @HostListener('mousedown')
  closeEditForAllChild(): void {
    this.children?.forEach(child => {
      child.edit = undefined;
    });
  }

  protected onContextMenuItemClick($event: ContextMenuClick, data: ExplorerFile): void {
    switch ($event.data.event) {
      case 'rename':
        ExplorerDirectoryComponent.enableEdit(data);
        break;
      case 'delete':
        this.deleteChild(data);
        this.children = (this.children || []).filter(file => file !== data);
        break;
      default:
        console.warn(`unknown event [${$event.data.event}]`);
    }
  }

  private toggleDirectoryIsOpen(child: EditorFile): void {
    if (this.isDirectory(child)) {
      child.isOpen = !child.isOpen;
    }
  }

  private deleteChild(child: EditorFile): void {
    this.children = (this.children || []).filter(file => file !== child);
  }
}
