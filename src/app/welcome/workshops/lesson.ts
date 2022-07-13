import { Step } from './Step';
import { CodeFile } from '../../file/file.model';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    type?: string; // will be type used?
    stepsCount: number;
    steps: Step[];
    hint?: string;
    codeFiles: CodeFile[];
    currentStep?: number; // not from API, internal used to memorize current selected step
  }
