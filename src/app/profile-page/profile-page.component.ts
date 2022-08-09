import { Component, OnInit } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
// import { AngularMaterial } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { User } from './user';
import { USERS } from './mock-user'; 
// import { User } from './user';
import { Router } from '@angular/router';
import { WorkshopService } from '../welcome/workshops/workshop.service';
import { WorkshopOverview } from '../welcome/workshops/workshop-overview.model';
import { User } from './user';
import { Subscription } from 'rxjs';
import { DraftService } from '../welcome/draft.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
users = USERS;
workshops: WorkshopOverview[] = [];
id: number = 1;
eventSubscription!: Subscription;

// trial = { id: "1", userName: 'Jenny', eMail: 'jenny@muster.at', password: 'encrypted', account: 'Lehrer', school: "Neue Mittelschule Kapfenberg", location: "Kapfenberg", startedWorkshops: ["flappy", "paint"], finishedWorkshops: ['paint'], xp: 200, codingTime: ["interesting?"] }

  constructor(
    private draftService: DraftService,
    private router: Router,
    private workshopService: WorkshopService
     
  ) 
  {}

  ngOnInit(): void {
    this.eventSubscription = this.draftService.current$.subscribe(id => this.id = id);
    this.workshopService.workshops$().subscribe(response => {
      this.workshops = response.WorkshopOverview;
    });
    
  }

  // TODO: not yet working, due to missing data from api, containing all workshops
  public startWorkshop(workshop: string): void {
    console.log("after click");
    console.log(workshop);
    console.log(this.workshops.length);
    for (let i = 0; i < this.workshops.length; i++) {
      console.log("in for");
      if (workshop == this.workshops[i].title.toString()) {
        console.log("before navigate");
        this.router.navigate([ 'workshops', this.workshops[i].id]);
      }
    } 

}







// public startWorkshop(workshop: string): void {
//   let i = 0;

//   while (workshop != WorkshopOverview[i].title) {
//     console.log(workshop + '!=' + WorkshopOverview[i].title);   
//     i++;   
      
//     }
//   if (workshop == WorkshopOverview[i].title) {
//     console.log('open', workshop);
//     this.router.navigate([ 'workshops', workshop.id ]);
//   }
  
// }
}