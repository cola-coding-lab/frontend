import { Url } from "url";
export interface Lesson {
    id: string;
    // uuid();
    title: string;
    description: string;
    descriptionImages: Url[];
    type: string;
    steps: any[];
    // steps: Step[];
    stepsImages: Url[]; //step separating
    hint: string;
  }
