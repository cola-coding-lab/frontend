import { Url } from "url";
import {v4 as uuid} from "uuid";

export interface WorkshopOverview {
  // TODO: how to import a uuid correctly (document it) and how to use it in an interface
    id: string = uuid();
    title: string;
    description: string;
    image: Url;
    lessonsCount: number;
    difficulty: string;
    categories: string[];
  }