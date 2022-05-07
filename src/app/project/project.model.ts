import { EditorFile } from '../file/file.model';

export interface IProject {
  id: string;
  name: string;
  title: string;
  description: string;
  files: EditorFile[];
  showHidden?: boolean;
}
