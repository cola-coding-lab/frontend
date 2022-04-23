import { EditorFile } from '../../file/file.model';

export interface IExplorer {
  'project-explorer': IExplorerRoot;
  base: IExplorerEntry;

  [key: string]: IExplorerEntry | IExplorerRoot;
}

interface IExplorerRoot {
  files: string[];
}

export interface IExplorerEntry {
  files: EditorFile[];
  description?: IExplorerDescription;
}

export interface IExplorerDescription {
  title: string;
  name: string;
  description: string;
  files?: IExplorerDescriptionFile[];
}

export interface IExplorerDescriptionFile {
  filename: string;
  isHidden: boolean;
}
