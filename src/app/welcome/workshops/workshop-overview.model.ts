import { ApiResponse } from './api-response.model';

export interface WorkshopOverview {
  id: string;
  title: string;
  description: string;
  image?: string; // will be removed in a later version
  assets?: string[]; // will replace image in a later version
  lessonsCount: number;
  difficulty: string;
  categories: string[];
}

export interface WorkshopOverviewAPIResponse extends ApiResponse {
  WorkshopOverviewMock: WorkshopOverview[];
}
