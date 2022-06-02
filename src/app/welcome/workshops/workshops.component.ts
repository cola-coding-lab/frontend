import { Component, Injectable, OnInit } from '@angular/core';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { WorkshopService } from './workshop.service';
import { WorkshopOverview } from './workshopOverview';
import { WORKSHOPS } from './mock-workshops';
import { NgSwitchCase, NgSwitch } from '@angular/common';
import { DraftService } from '../draft.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: [ './workshops.component.scss' ]
})

export class WorkshopsComponent {
  workshops : WorkshopOverview [] = WORKSHOPS;
  id: number = 0;
  eventSubscription : Subscription;

  constructor (public draftService : DraftService) {
    this.eventSubscription = this.draftService.getClickEvent(this.id).subscribe (id => this.id = id);
    console.log(`workshopsCom, constructor`);
  }
 
  // constructor(private draftWorkshopService: DraftWorkshopService) {
    
    // this.clickEventSubscription = this.draftWorkshopService.getClickEvent(this.id).subscribe(id => this.id = id);
    // console.log(`triggered in workshops, id: ${this.id}`)
  // }

  // xy() : void {
  //   this.draftWorkshopService.getClickEvent(this.id);
  // }

  // ngOnInit(): void { }

  // getDraftWorkshopOverviewList(id : number) {
  //   this.dra
  // }
}