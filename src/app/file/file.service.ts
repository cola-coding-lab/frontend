import { Injectable } from '@angular/core';
import * as CodeMirror from 'codemirror';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private filesSubject: Subject<EditorFile[]>;
  private currentSubject: Subject<EditorFile | undefined>;
  private files: EditorFile[] = [
    new ExplorerFile({
      name: 'test.js',
      type: 'text/javascript',
      content: 'class Test {\n  constructor() {\n    this.a = 1;\n  }\n\n  something(x, y) {\n    this.a = x;\n    console.log(y);\n  }\n}',
    }),
    new ExplorerFile({
      name: 'main.js',
      type: 'text/javascript',
      content: 'const t = new Test();\nt.something(12, 3);\nconsole.log(t.a);\ndocument.write(t.a);',
    }),
    new ExplorerFile({
      name: 'src',
      type: 'directory',
      children: [
        {
          name: 'some.js',
          type: 'text/javascript',
          content: 'console.log("something");',
        },
      ],
    }),
  ];
  private currentFile?: EditorFile;

  constructor() {
    this.filesSubject = new BehaviorSubject(this.files);
    this.currentSubject = new BehaviorSubject(this.currentFile);
  }

  public subscribe(next: (value: EditorFile[]) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.filesSubject.subscribe(next, error, complete);
    // return this.filesSubject.subscribe((value:EditorFile[]) => {}, (err: Error) => {}, () => {});
  }

  public current(next: (value?: EditorFile) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.currentSubject.subscribe(next, error, complete);
  }

  public select(file: EditorFile, parent?: EditorFile): void {
    console.log('select', file, parent);

    if (parent) {
      if (!this.includes(file, parent)) {
        const children = parent?.children ? parent.children : [];
        parent!!.children = [...children, file];
        this.filesSubject.next(this.files);
      }
    } else if (!this.files.includes(file)) {
      this.files.push(file);
      this.filesSubject.next(this.files);
    }
    file.editor = undefined;
    file.isModified = undefined;
    this.currentSubject.next(file);
  }

  public delete(file: EditorFile): void {
    if (this.currentFile === file) {
      this.currentSubject.next(undefined);
    }
    this.files = this.files.filter(f => file !== f);
    this.filesSubject.next(this.files);
  }

  private includes(file: EditorFile, parent?: EditorFile): boolean {
    for (const child of parent?.children || []) {
      if (child.type === 'directory') {
        return this.includes(child, file);
      }
      if (child === file) {
        return true;
      }
    }
    return (parent === file);
  }
}

type FileType = 'text/javascript' | 'text/css' | 'text/html' | 'text/plain' | 'directory';

export interface EditorFile {
  name: string;
  type: FileType;
  content?: string;
  isModified?: boolean;
  isOpen?: boolean;
  editor?: CodeMirror.Editor;
  children?: EditorFile[];
}

export function getFileType(value: string, defaultType: FileType = 'text/plain'): FileType {
  const result = /\.(js|css|html?|txt)/i.exec(value);
  if (result?.[1]) {
    switch (result[1].toLowerCase()) {
      case 'js':
        return 'text/javascript';
      case 'css':
        return 'text/css';
      case 'html':
      case 'htm':
        return 'text/html';
      case 'txt':
        return 'text/plain';
      default:
        return defaultType;
    }
  }
  return defaultType;
}


class ExplorerFile implements EditorFile {
  public name: string;
  public readonly type: FileType;
  public isOpen: boolean;
  private _editor?: CodeMirror.Editor;

  constructor(obj?: EditorFile) {
    this.name = obj?.name || '';
    this.type = obj?.type || 'text/plain';
    if (this.isDirectory) {
      this._children = obj?.children?.map(child => new ExplorerFile(child)) || [];
    }
    if (this.isFile) {
      this._content = obj?.content || '';
      this._editor = obj?.editor || undefined;
    }
    this._isModified = obj?.isModified || false;
    this.isOpen = obj?.isOpen || false;
  }

  private _content?: string;

  public get content() {
    return this._content || '';
  }

  public set content(val: string) {
    if (this.isDirectory) { return; }
    this._content = val;
  }

  private _isModified?: boolean;

  public get isModified() {
    return this._isModified || false;
  }

  public set isModified(val: boolean) {
    this._isModified = val;
  }

  private _children?: EditorFile[];

  public get children() {
    if (this.isFile) { return; }
    return this._children;
  }

  public get isDirectory() {
    return this.type === 'directory';
  }

  public get isFile() {
    return !this.isDirectory;
  }

  public getEditor(): CodeMirror.Editor | undefined {
    return this._editor;
  }

  public setEditor(val?: CodeMirror.Editor): void {
    if (this.isDirectory) { return; }
    this._editor = val;
  }

  public addChild(child: EditorFile): void {
    if (this.isFile) { return; }
    if (!this._children!!.includes(child)) {
      this._children!!.push(child);
    }
  }

  public removeChild(child: EditorFile): void {
    if (this.isFile) { return; }
    this._children = this._children!!.filter(file => file !== child);
  }
}
