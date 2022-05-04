import { EditorFile } from '../app/file/file.model';

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
