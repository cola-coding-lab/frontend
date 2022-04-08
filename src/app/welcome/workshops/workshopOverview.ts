export interface WorkshopOverview {
  // TODO: how to import a uuid correctly (document it) and how to use it in an interface
  id: string;
  title: string;
  description: string;
  image: string;
  lessonsCount: number;
  difficulty: string;
  categories: string[];
}
