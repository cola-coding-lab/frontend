import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkshopOverview } from './workshop-overview.model';
import { DraftService } from '../draft.service';
import { WorkshopService } from './workshop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: [ './workshops.component.scss' ],
})
export class WorkshopsComponent implements OnInit {
  workshops: WorkshopOverview [] = [];
  id: number = 1;
  eventSubscription!: Subscription;

  constructor(
    private draftService: DraftService,
    private workshopService: WorkshopService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.eventSubscription = this.draftService.current$.subscribe(id => this.id = id);
    this.workshopService.workshops$().subscribe(response => this.workshops = response.WorkshopOverviewMock);
  }

  public startWorkshop(workshop: WorkshopOverview): void {
    console.log('open', workshop);
    this.router.navigate([ 'workshops', workshop.id ]);
  }
}
