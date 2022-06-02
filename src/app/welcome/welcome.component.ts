import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DraftService } from './draft.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: [ './welcome.component.scss' ],
})
export class WelcomeComponent implements OnInit {
  id: number = 1;
  clickEventsubscription!: Subscription;

  constructor(private draftService: DraftService) {
    console.log(`welcomeCom, constructor`);
  }

  ngOnInit(): void {
    this.clickEventsubscription = this.draftService.current$.subscribe(id => this.id = id);
  }

  getDraftWorkshops(id: number) {
    this.id = id;
    this.draftService.current = id;
    console.log(`welcomeCom, getDraftWorkshops, id: ${id}`);
  }
}
