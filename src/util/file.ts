import { EditorFile, FileType } from '../app/file/file.model';

export const emptyFile = (name = 'main.js', type: FileType = 'text/javascript'): EditorFile => {
  return {
    name,
    type,
    content: '',
  };
};

export function checkForActiveFile(files: EditorFile[]): EditorFile[] {
  // check/correct that only one file is active
  const active = files.filter(f => f.isOpen);
  if (active.length === 0 && files.length > 0) {
    files[0].isOpen = true;
  } else if (active.length > 1) {
    files = files.map(f => {
      f.isOpen = false;
      return f;
    });
    files[0].isOpen = true;
  }

  return files;
}
