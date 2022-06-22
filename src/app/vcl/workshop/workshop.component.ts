import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from '../../welcome/workshops/workshop.service';
import { WorkshopDetail } from '../../welcome/workshops/workshop-detail.model';
import { v4 } from 'uuid';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: [ './workshop.component.scss' ],
})
export class WorkshopComponent implements OnInit {
  public workshop?: WorkshopDetail;
  public currentLesson: number = 0;
  private workshopId?: string;

  constructor(
    private route: ActivatedRoute,
    private workshopsService: WorkshopService,
  ) {
    this.route.params.subscribe(params => this.workshopId = params['id']);
  }

  ngOnInit(): void {
    if (!this.workshopId) {
      console.log('TODO: Redirect to Workshops!');
      return;
    }
    this.workshopsService.workshop$(this.workshopId).subscribe(response => {
        this.workshop = { ...response, id: v4() };
      },
      error => {
        console.error(error);
        console.log('TODO: Redirect to Workshops!');
      });
    console.log(this.workshopId);
  }

}
