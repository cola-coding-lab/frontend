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
   {
      name: 'test.js',
      type: 'text/javascript',
      content: 'class Test {\n  constructor() {\n    this.a = 1;\n  }\n\n  something(x, y) {\n    this.a = x;\n    console.log(y);\n  }\n}',
    },
    {
      name: 'main.js',
      type: 'text/javascript',
      content: 'const t = new Test();\nt.something(12, 3);\nconsole.log(t.a);\ndocument.write(t.a);',
    },
    {
      name: 'src',
      type: 'directory',
      children: [
        {
          name: 'some.js',
          type: 'text/javascript',
          content: 'console.log("something");',
        },
      ],
    },
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

export const validFileExtensionRegex = /\.(js|css|html?|txt)/i;

export function getFileType(value: string, defaultType: FileType = 'text/plain'): FileType {
  const result = validFileExtensionRegex.exec(value);
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
