// Todo: move into shared-types?
export interface OutputFile {
  id?: string;
  src?: string;
  innerHTML?: string;
  place?: 'head' | 'body';
}
