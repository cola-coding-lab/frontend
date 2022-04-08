import { Component, OnInit } from '@angular/core';
import { WorkshopService } from './workshop.service';
import { WorkshopOverview } from "./workshopOverview";

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: [ './workshops.component.scss' ]
})
export class WorkshopsComponent implements OnInit {
  workshops: WorkshopOverview[] = [];

  constructor(private workshopService: WorkshopService) {
  }

  ngOnInit(): void {
    this.workshopService.getWorkshops().subscribe(
      (response) => {
        this.workshops = response.WorkshopOverviewMock;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
