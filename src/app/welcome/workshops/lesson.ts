import { Step } from './Step';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    type: string;
    steps: Step[];
    hint?: string;
  }
