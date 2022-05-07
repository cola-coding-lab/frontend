import { Step } from './Step';
import { CodeFile } from '../../file/file.model';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    type: string;
    steps: Step[];
    hint?: string;
    code: CodeFile[];
  }
