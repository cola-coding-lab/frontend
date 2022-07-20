export interface Step {
  id: string;
  title: string;
  description: string;
  isOptional: boolean;
  hint?: boolean; // ??
  images?: string[]; // will be replaced in a later version
  assets?: string[]; // will replace images in a later version
}
