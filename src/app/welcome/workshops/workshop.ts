export interface Workshop {
    id: number;
    title: string;
    shortDescription: string;
    image: string;
    detailDescription: string;
    // used to be able to collapse the details in html; example: https://plnkr.co/edit/C46mnJpT0MsEP4FVQLYM?p=preview&preview
    isCollapsed: true;
  }