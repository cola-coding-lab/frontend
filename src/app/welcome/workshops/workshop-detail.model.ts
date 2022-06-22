import { LessonOverview } from './lessonOverview';
import { ApiResponse } from './api-response.model';

export interface WorkshopDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  categories: string[];
  lessons: LessonOverview[];
}

export interface WorkshopDetailAPIResponse extends WorkshopDetail, ApiResponse {}
