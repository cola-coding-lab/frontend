import { EditorFile } from '../../file/file.model';

export interface ExplorerFile extends EditorFile {
  children?: ExplorerFile[];
  edit?: boolean;
}
