import { Url } from "url";
import {v4 as uuid} from "uuid";

export interface WorkshopOverview {
  // TODO: using a UUID correctly, maybe -> import {v4 as uuid} from "uuid"; 
    id: string;
    // uuid();
    title: string;
    description: string;
    image: URL;
    lessonsCount: number;
    difficulty: string;
    categories: string[];
  }