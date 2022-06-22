import { ApiResponse } from './api-response.model';

export interface WorkshopOverview {
  id: string;
  title: string;
  description: string;
  image: string;
  lessonsCount: number;
  difficulty: string;
  categories: string[];
}

export interface WorkshopOverviewAPIResponse extends ApiResponse {
  WorkshopOverviewMock: WorkshopOverview[];
}
