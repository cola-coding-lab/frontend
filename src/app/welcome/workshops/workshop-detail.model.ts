import { ApiResponse } from './api-response.model';
import { Lesson } from './lesson';

export interface WorkshopDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  categories: string[];
  lessons: Lesson[];
}

export interface WorkshopDetailAPIResponse extends WorkshopDetail, ApiResponse {}
