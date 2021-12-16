import * as CodeMirror from 'codemirror';

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

export function emptyFile(name: string = 'main.js', type: FileType = 'text/javascript'): EditorFile {
  return {
    name,
    type,
    content: isFile(type) ? '' : undefined,
    children: isDirectory(type) ? [] : undefined,
  };
}

export function isDirectory(type: FileType): boolean {
  return type === 'directory';
}

export function isFile(type: FileType): boolean {
  return !isDirectory(type);
}
