import * as CodeMirror from 'codemirror';
import { ExplorerFile } from '../workspace/explorer/file/file.model';

export interface FSElement {
  id?: number;
  name: string;
  projectId: string;
}

export interface CodeFile {
  name: string;
  type: MimeType;
  content: string;
}

export interface EditorFile extends FSElement, CodeFile {
  isModified?: boolean;
  isOpen: boolean;
  editor?: CodeMirror.Editor;
  children?: EditorFile[]; // TODO: Remove
}

export interface Directory extends FSElement {
  children: ExplorerFile[];
}

export enum MimeType {
  js = 'text/javascript',
  css = 'text/css',
  html = 'text/html',
  plain = 'text/plain',
  jpeg = 'image/jpeg',
  png = 'image/png',
  gif = 'image/gif'
}

export const validFileExtensionRegex = /\.(js|css|html?|txt)/i;

export function getFileType(value: string, defaultType: MimeType = MimeType.plain): MimeType {
  const result = validFileExtensionRegex.exec(value);
  if (result?.[1]) {
    switch (result[1].toLowerCase()) {
      case 'js':
        return MimeType.js;
      case 'css':
        return MimeType.css;
      case 'html':
      case 'htm':
        return MimeType.html;
      case 'txt':
        return MimeType.plain;
      default:
        return defaultType;
    }
  }
  return defaultType;
}

export function emptyFile(projectId: string, name: string = 'main.js', type = MimeType.js): EditorFile {
  return {
    name,
    type,
    projectId,
    content: '',
    isOpen: false,
  };
}
