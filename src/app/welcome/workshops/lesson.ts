import { Step } from './Step';
import { Codefile } from './codefile';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    type: string;
    steps: Step[];
    hint?: string;
    code: Codefile[];
  }
