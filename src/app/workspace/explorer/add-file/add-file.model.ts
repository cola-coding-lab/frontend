export type AddFileType = 'file' | 'directory';

export interface AddFileResult {
  type: AddFileType,
  name: string,
}

