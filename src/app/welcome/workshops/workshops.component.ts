import { Component, Injectable, OnInit, Pipe } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkshopOverview } from './workshop-overview.model';
import { DraftService } from '../draft.service';
import { WorkshopService } from './workshop.service';
import { Router } from '@angular/router';
// import { Md2htmlPipe } from '../../lessons-workspace/md2html.pipe';

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
    // private Md2htmlPipe: Md2htmlPipe,
  ) {

  }

  ngOnInit(): void {
    this.eventSubscription = this.draftService.current$.subscribe(id => this.id = id);
    this.workshopService.workshops$().subscribe(response => {
      this.workshops = response.WorkshopOverview;
    });
  }

  public startWorkshop(workshop: WorkshopOverview): void {
    console.log('open', workshop);
    this.router.navigate([ 'workshops', workshop.id ]);
  }
}
