import { Url } from "url";
import {v4 as uuid} from "uuid";

export interface LessonOverview {
  // TODO: how to import a uuid correctly (document it) and how to use it in an interface
    id: string;
    // uuid();
    title: string;
    stepsCount: number;
  }