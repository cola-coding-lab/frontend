import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ContextMenuClick } from '../../../context-menu/context-menu.model';
import { HasContextMenuComponent } from '../../../context-menu/has-context-menu.component';
import { OpenTabsService } from '../../editor/tab-container/open-tabs.service';
import { Directory, EditorFile, getFileType } from '../../../file/file.model';
import { AddFileComponent } from '../add-file/add-file.component';
import { AddFileDirective } from '../add-file/add-file.directive';
import { AddFileResult, AddFileType } from '../add-file/add-file.model';
import { CurrentSelectedService } from './current-selected.service';
import { ExplorerFile } from './file.model';
import { db } from '../../../../util/db/db';

@Component({
  selector: 'explorer-file',
  templateUrl: './file.component.html',
  styleUrls: [ './file.component.scss' ],
})
export class FileComponent extends HasContextMenuComponent<EditorFile> implements OnInit {
  private static BASE_PADDING = 8;
  private static ADD_PADDING = 22;

  @Input() public root: boolean = false;
  @Input() public depth: number = 0;
  @Input() public collapse?: boolean = false;
  @Input() public parent: Directory = { projectId: '', name: '/', children: [] };
  @Output() public parentChange: EventEmitter<Directory> = new EventEmitter<Directory>();
  @Output() public onFilesUpdate: EventEmitter<EditorFile[]> = new EventEmitter<EditorFile[]>();

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLUListElement>;

  protected contextMenuItems = [
    { text: 'löschen', event: 'delete' },
    { text: 'umbenennen', event: 'rename' },
    { text: 'neue datei', event: 'new-file' },
    // { text: 'neuer ordner', event: 'new-dir' },
  ];

  @ViewChild(AddFileDirective, { static: true }) private addFile!: AddFileDirective;
  private tmpName?: string;
  private activeFile?: EditorFile;

  constructor(
    private currentSelectedService: CurrentSelectedService,
    private openTabsService: OpenTabsService,
  ) { super(); }

  @ViewChild('editRef', { read: ElementRef })
  private set editRef(ref: ElementRef) {
    ref?.nativeElement?.focus();
  }

  private static enableEdit(child: ExplorerFile): void {
    child.edit = true;
  }

  ngOnInit(): void {
    console.log('file init');
    this.currentSelectedService.currentSelected$(
      value => {
        this.activeFile = value;
        if (
          value
          && !this.isDirectory(value)
          && this.parent.children?.includes(value)
        ) {
          setTimeout(() => { // needed because state of parent node will be changed after change-detection run!
            // this.parent.isOpen = true;
          }, 0);
        }
      },
      err => console.error(err),
    );
  }

  public isDirectory(file: EditorFile): boolean {
    //return file.type === 'directory';
    return false;
  }

  public clicked($event: MouseEvent, child: EditorFile): void {
    $event.stopPropagation();
    if (this.isDirectory(child) && this.isActive(child)) {
      this.toggleDirectoryIsOpen(child);
    } else if (!this.isDirectory(child)) {
      this.select(child);
      this.openTabsService.select(child);
    }
    this.currentSelectedService.currentSelected = child;
  }

  public toggle($event: MouseEvent, child: EditorFile): void {
    $event.stopPropagation();
    this.toggleDirectoryIsOpen(child);
  }

  public isActive(child: EditorFile): boolean {
    return this.activeFile === child; //&& child !== this.parent;
  }

  public edit($event: MouseEvent, child: ExplorerFile): void {
    $event.stopPropagation();
    FileComponent.enableEdit(child);
  }

  public delete($event: MouseEvent, child: EditorFile): void {
    $event.stopPropagation();
    if (window.confirm(`will you ${child.name} delete?`)) {
      this.deleteChild(child);
    }
  }

  public exitEdit($event: KeyboardEvent, child: ExplorerFile): void {
    switch ($event.key) {
      case 'Escape':
        child.edit = undefined;
        break;
      case 'Enter':
        child.name = this.tmpName || child.name;
        this.tmpName = undefined;
        child.edit = undefined;
        db.saveFile(child);
        break;
      default:
        break;
    }
  }

  public updateFileName(fileName: string): void {
    this.tmpName = fileName;
  }

  public paddingLeft(): string {
    return `${this.depth * FileComponent.ADD_PADDING + FileComponent.BASE_PADDING}px !important`;
  }

  public add(type: AddFileType = 'file'): void {
    const viewContainerRef = this.addFile.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AddFileComponent>(AddFileComponent);
    componentRef.instance.type = type;
    componentRef.instance.paddingLeft = this.paddingLeft();

    componentRef.instance.onAddFileAbort.subscribe(() => {
      viewContainerRef?.clear();
    });
    componentRef.instance.onAddFileSave.subscribe(async (result: AddFileResult) => {
      if (result.type === 'file') {
        const file: EditorFile = {
          name: result.name,
          type: getFileType(result.name),
          isOpen: true,
          content: '',
          projectId: this.parent.projectId,
          id: await db.nextFileId(this.parent.projectId),
        };
        db.saveFile(file);
        this.parent.children.push(file);
        this.openTabsService.select(file);
        viewContainerRef.clear();
      }
      /*const dir = (siblingType === 'file') ? this.parent.children : this.parent.children?.find(id => id === siblingName)?.children;
      console.log(dir);
      if (dir?.find(child => child.name === file.name)) {
        alert(`${file.name} already exists`);
        componentRef?.instance.inputRef.nativeElement.focus();
        return;
      }
      viewContainerRef?.clear();
      if (siblingType === 'file') {
        this.parent.children?.push(file);
      } else {
        this.parent.children?.forEach(child => {
          if (child.name === siblingName) { child.children?.push(file);}
        });
      }
      this.currentSelectedService.currentSelected = file;
      if (!this.isDirectory(file)) {
        this.openTabsService.select(file);
      }
       */
    });
    this.container.nativeElement.appendChild(componentRef.location.nativeElement);
  }

  protected onContextMenuItemClick($event: ContextMenuClick, data: ExplorerFile): void {
    switch ($event.data.event) {
      case 'rename':
        FileComponent.enableEdit(data);
        break;
      case 'delete':
        this.deleteChild(data);
        break;
      case 'new-file':
        this.add();
        break;
      case 'new-dir':
        this.add('directory');
        break;
      default:
        console.warn(`unknown event [${$event.data.event}]`);
    }
  }

  @HostListener('document:mousedown')
  private closeEditForAllChild(): void {
    this.parent.children?.forEach(child => {
    });
  }

  private toggleDirectoryIsOpen(child: EditorFile): void {
    if (this.isDirectory(child)) {
      child.isOpen = !child.isOpen;
    }
  }

  private async deleteChild(child: EditorFile): Promise<void> {
    const childs = this.parent.children?.filter(file => file.id !== child.id);
    this.parent.children = [];

    await db.deleteFile(child);
    this.openTabsService.remove(child);
    this.parent.children = childs;
    this.parentChange.emit(this.parent);
    // this.ref.detectChanges();
  }

  private select(file: EditorFile): void {
    if (!this.includes(file, this.parent)) {
      const children = this.parent.children || [];
      // this.parent.children = [ ...children, file ];
    } else if (!this.parent.children?.includes(file)) {
      this.parent.children?.push(file);
    }
    // this.onFilesUpdate.emit(this.parent.children);
  }

  private includes(file: EditorFile, parent?: Directory): boolean {
    return false;
    /*for (const child of parent?.children || []) {
      if (child.type === 'directory') {
        return this.includes(child, file);
      }
      if (child === file) {
        return true;
      }
    }
    return (parent === file);

     */
  }

}
