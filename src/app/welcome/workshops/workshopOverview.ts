export interface WorkshopOverview {
  id: string;
  title: string;
  description: string;
  image: string;
  lessonsCount: number;
  difficulty: string;
  categories: string[];
}

export interface WorkshopOverviewAPIResponse {
  WorkshopOverviewMock: WorkshopOverview[];
  url: string;
  method: string;
  timestamp: string;
}
