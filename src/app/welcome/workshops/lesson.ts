import { Url } from "url";
import {v4 as uuid} from "uuid";

export interface Lesson {
  // TODO: how to import a uuid correctly (document it) and how to use it in an interface
    id: string;
    // uuid();
    title: string;
    description: string;
    descriptionImages: Url[];
    type: string;
    steps: any[];
    stepsImages: Url[];
    hint: string;
  }
