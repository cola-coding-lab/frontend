import { Url } from "url";
import { LessonOverview } from "./lessonOverview";

export interface WorkshopDetails {
    id: string;
    title: string;
    description: string;
    image: Url;
    difficulty: string;
    categories: string[];
    lessons: LessonOverview[];
  }