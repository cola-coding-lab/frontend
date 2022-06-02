import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkshopOverview } from './workshopOverview';
import { WORKSHOPS } from './mock-workshops';
import { DraftService } from '../draft.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: [ './workshops.component.scss' ],
})
export class WorkshopsComponent implements OnInit {
  workshops: WorkshopOverview [] = WORKSHOPS;
  id: number = 1;
  eventSubscription!: Subscription;

  constructor(private draftService: DraftService) {
    console.log(`workshopsCom, constructor`);
  }

  ngOnInit(): void {
    this.eventSubscription = this.draftService.current$.subscribe(id => this.id = id);
  }
}
