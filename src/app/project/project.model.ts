import { EditorFile } from '../file/file.model';

export interface IProject {
  name: string;
  title: string;
  description: string;
  files: EditorFile[];
}
