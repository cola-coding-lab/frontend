import * as CodeMirror from 'codemirror';

export type FileType = 'text/javascript' | 'text/css' | 'text/html' | 'text/plain'; // | 'directory';

export interface FSElement {
  id?: number;
  name: string;
  projectId: string;
}

export interface EditorFile extends FSElement {
  type: FileType;
  content: string;
  isModified?: boolean;
  isOpen: boolean;
  editor?: CodeMirror.Editor;
  children?: EditorFile[]; // TODO: Remove
}

export interface Directory extends FSElement {
  children: EditorFile[];
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

export function emptyFile(projectId: string, name: string = 'main.js', type: FileType = 'text/javascript'): EditorFile {
  return {
    name,
    type,
    projectId,
    content: '', //isFile(type) ? '' : undefined,
    isOpen: false,
  };
}

export function isDirectory(type: FileType): boolean {
  // return type === 'directory';
  return false;
}

export function isFile(type: FileType): boolean {
  return !isDirectory(type);
}
